import os
import os.path
import stat
import platform
import trueskill
import pymysql.cursors
import random
import shutil
import urllib.request
import urllib.parse
from sandbox import *
from config import *
import copy

TRON_PROBLEM_ID = 3
cnx = pymysql.connect(host="162.243.229.252", user="superuser", database="Defhacks", password=PASS, charset="utf8mb4", cursorclass=pymysql.cursors.DictCursor)
cursor = cnx.cursor()

def unpack(filePath, destinationFilePath):
	tempPath = os.path.join(destinationFilePath, "bot")
	os.mkdir(tempPath)
	
	# Extract the archive into a folder call 'bot'
	if platform.system() == 'Windows':
		os.system("7z x -o"+tempPath+" -y "+filePath+". > NUL")
	else:
		os.system("unzip -u -d"+tempPath+" "+filePath+" > /dev/null 2> /dev/null")

	# Remove __MACOSX folder if present
	macFolderPath = os.path.join(tempPath, "__MACOSX")
	if os.path.exists(macFolderPath) and os.path.isdir(macFolderPath):
		shutil.rmtree(macFolderPath)

	# Copy contents of bot folder to destinationFilePath remove bot folder
	for filename in os.listdir(tempPath):
		shutil.move(os.path.join(tempPath, filename), os.path.join(destinationFilePath, filename))
	
	shutil.rmtree(tempPath)
	#os.remove(filePath)

def runGame(userIDs, muValues, sigmaValues):
	print("Starting game")

	# Setup working path
	workingPath = "workingPath"
	if os.path.exists(workingPath):
		shutil.rmtree(workingPath)	
	os.makedirs(workingPath)
	os.chmod(workingPath, 0o777)
	
	shutil.copyfile("Tron_Environment.py", os.path.join(workingPath, "Tron_Environment.py"))

	sandbox = Sandbox(workingPath)

	# Unpack and setup bot files
	botPaths = [os.path.join(workingPath, str(userID)) for userID in userIDs]
	for botPath in botPaths: os.mkdir(botPath)
	for a in range(len(userIDs)): unpack("../outputs/TR/"+ str(userIDs[a]) + ".zip", botPaths[a])
	for botPath in botPaths:
		if os.path.isfile(os.path.join(botPath, "run.sh")) == False:
			return		
		os.chmod(botPath, 0o777)
		os.chmod(os.path.join(botPath, "run.sh"), 0o777)
	
	# Build the shell command that will run the game. Executable called environment houses the game environment
	runGameShellCommand = "python3 /var/www/nycsl/problems/workers/"+workingPath+"/Tron_Environment.py "
	for botPath in botPaths: runGameShellCommand += "\"cd "+os.path.abspath(botPath)+"; "+os.path.join(os.path.abspath(botPath), "run.sh")+"\" "
	
	print(runGameShellCommand)
	# Run game
	sandbox.start(runGameShellCommand)
	lines = []
	while True:
		line = sandbox.read_line(200)
		if line == None:
			break
		lines.append(line)
	
	print("Output----------------------")
	print("\n".join(lines));	
	print("----------------------------")
	
	# Get player ranks and scores by parsing shellOutput
	if len(lines) < 2:
		print("NOT ENOUGH OUTPUT!!!!\n ABORTING")
		return
	if "won!" in lines[-2]:
		winnerIndex = int(lines[-2][len("Player ") : -len("won!")]) - 1
		loserIndex = 0 if winnerIndex == 1 else 1
	
	else:
		winnerIndex = random.randrange(0, 2)
		loserIndex = 0 if winnerIndex == 1 else 1
	winnerID = userIDs[winnerIndex]
	loserID = userIDs[loserIndex]

	# Update trueskill mu and sigma values
	winnerRating = trueskill.Rating(mu=float(muValues[winnerIndex]), sigma=float(sigmaValues[winnerIndex]))
	loserRating = trueskill.Rating(mu=float(muValues[loserIndex]), sigma=float(sigmaValues[loserIndex]))
	winnerRating, loserRating = trueskill.rate_1vs1(winnerRating, loserRating)
	print(winnerRating)	
	cursor.execute("UPDATE Submission SET mu = %f, sigma = %f, score = %d WHERE userID = %d and problemID = %d" % (winnerRating.mu, winnerRating.sigma, float(winnerRating.mu - (3*winnerRating.sigma)), winnerID, TRON_PROBLEM_ID))
	cursor.execute("UPDATE Submission SET mu = %f, sigma = %f, score = %d WHERE userID = %d and problemID = %d" % (loserRating.mu, loserRating.sigma, float(loserRating.mu - (3*loserRating.sigma)), loserID, TRON_PROBLEM_ID))
	cnx.commit()

	# Get replay file by parsing shellOutput
	replayFilename = lines[-1][len("Output file is stored at ") : len(lines[-1])]
	shutil.move(os.path.join(workingPath, replayFilename), "../storage")
	
	# Store results of game
	cursor.execute("INSERT INTO Game (replayFilename) VALUES (\'"+os.path.basename(replayFilename)+"\')")
	cnx.commit()

	cursor.execute("SELECT gameID FROM Game WHERE replayFilename = \'"+replayFilename+"\'")
	gameID = cursor.fetchone()['gameID']
	
	cursor.execute("INSERT INTO GameToUser (gameID, userID, rank, playerIndex) VALUES (%d, %d, %d, %d)" % (gameID, winnerID, 0, 0 if userIDs[0] == winnerID else 1))
	cursor.execute("INSERT INTO GameToUser (gameID, userID, rank, playerIndex) VALUES (%d, %d, %d, %d)" % (gameID, loserID, 1, 0 if userIDs[0] == loserID else 1))
	cnx.commit()
	
	print("Done inserting into mysql")

	shutil.rmtree(workingPath)
	
	print("Done with game")

def getRank(submissionID):
	return int(urllib.request.urlopen("http://nycsl.io/php/rank?submissionID="+str(submissionID)).read())
def postToSlack(text):
	pass
	#urllib.request.urlopen("https://slack.com/api/chat.postMessage?"+ urllib.parse.urlencode({"token" : ROBOTICS_SLACK_TOKEN, "channel" : "programming_electrics", "text": text}))
	#urllib.request.urlopen("https://slack.com/api/chat.postMessage?"+ urllib.parse.urlencode({"token" : NYCSL_SLACK_TOKEN, "channel" : "general", "text": text}))

while True:
	cursor.execute("SELECT * FROM Submission WHERE isReady = 1 and problemID = " + str(TRON_PROBLEM_ID))
	submissions = cursor.fetchall()
	submissions.sort(key=lambda x: int(x['score']))
	
	submission = submissions[random.randrange(0, len(submissions))]

	allowedOpponents = copy.deepcopy(submissions)
	allowedOpponents.remove(submission)
	opponent = allowedOpponents[random.randrange(0, len(allowedOpponents))]

	submissionStartingRank = getRank(submission['submissionID'])
	opponentStartingRank = getRank(opponent['submissionID'])
	
	runGame([submission['userID'], opponent['userID']], [submission['mu'], opponent['mu']], [submission['sigma'], opponent['sigma']])

	newSubmissionRank = getRank(submission['submissionID'])
	newOpponentRank = getRank(opponent['submissionID'])

	def rankChangePost(userID, rank):
		cursor.execute("SELECT * FROM User WHERE userID="+str(userID))
		player = cursor.fetchone()
		postToSlack(player['firstName'] + " " + player['lastName'] + " has moved into rank " + str(rank))

	if newSubmissionRank != submissionStartingRank:
		rankChangePost(submission['userID'], newSubmissionRank)
	if newOpponentRank != opponentStartingRank:
		rankChangePost(opponent['userID'], newOpponentRank)

	if len(os.listdir("../storage")) > 100000: 
		files = os.listdir("../storage")
		files.sort()
		for f in files:				
			if os.path.isfile(os.path.join("../storage", f)):
				os.remove(os.path.join("../storage", f))
				break
	
	# Keep docker from crashing the system
	os.system("sudo rm /run/network/ifstate.veth*")	
	os.system("docker stop $(docker ps -a -q)")
	os.system("docker rm $(docker ps -a -q)")
