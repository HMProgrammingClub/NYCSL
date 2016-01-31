import os
import os.path
import stat
import platform
import trueskill
import pymysql.cursors
import random
import shutil
from sandbox import *

TRON_PROBLEM_ID = 3

cnx = pymysql.connect(host="104.131.81.214", user="superuser", database="DefHacks", password="fustercluck", charset="utf8mb4", cursorclass=pymysql.cursors.DictCursor)
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
	# Setup working path
	workingPath = "workingPath"
	if os.path.exists(workingPath):
		shutil.rmtree(workingPath)	
	os.makedirs(workingPath)
	os.chmod(workingPath, 0o777)

	sandbox = Sandbox(workingPath)

	# Unpack and setup bot files
	botPaths = [os.path.join(workingPath, str(userID)) for userID in userIDs]
	for botPath in botPaths: os.mkdir(botPath)
	for a in range(len(userIDs)): unpack("../outputs/TR/"+ str(userIDs[a]) + ".zip", botPaths[a])
	for botPath in botPaths:
		print(botPath)
		os.chmod(botPath, 0o777)
		os.chmod(os.path.join(botPath, "run.sh"), 0o777)
	
	# Build the shell command that will run the game. Executable called environment houses the game environment
	runGameShellCommand = "python3 /var/www/nycsl/problems/workers/TR_environment_main.py "
	for botPath in botPaths: runGameShellCommand += "\"cd "+os.path.abspath(botPath)+"; "+os.path.join(os.path.abspath(botPath), "run.sh")+"\" "
	print(runGameShellCommand)

	# Run game
	sandbox.start(runGameShellCommand)
	shellOutput = []
	while True:
		line = sandbox.read_line(200)
		print(line)
		if line == None:
			break
		shellOutput.append(line)
	
	lines = shellOutput.split("\n")
	lines.remove("")
	
	# Get player ranks and scores by parsing shellOutput
	winnerNumber = int(lines[-2][len("Player ") : -len("won!")])
	winnerIndex = winnerNumber - 1
	winnerID = userIDs[winnerIndex]
	loserIndex = (1 if winnerNumber == 2 else 2)-1
	loserID = userIDs[loserIndex]

	# Update trueskill mu and sigma values
	teams = []
	teams.append([trueskill.Rating(mu=float(muValues[winnerIndex]), sigma=float(sigmaValues[winnerIndex]))])
	teams.append([trueskill.Rating(mu=float(muValues[loserIndex]), sigma=float(sigmaValues[loserIndex]))])
	newRatings = [ratingTuple[0] for ratingTuple in trueskill.rate(teams)]

	cursor.execute("UPDATE Submission SET mu = %f, sigma = %f WHERE userID = %d and problemID = %d" % (newRatings[0].mu, newRatings[0].sigma, winnerID, TRON_PROBLEM_ID))
	cursor.execute("UPDATE Submission SET mu = %f, sigma = %f WHERE userID = %d and problemID = %d" % (newRatings[1].mu, newRatings[1].sigma, loserID, TRON_PROBLEM_ID))
	cnx.commit()

	# Get replay file by parsing shellOutput
	replayFilename = lines[-1][len("Output file is stored at ") : len(lines[-1])]

	# Store results of game
	cursor.execute("INSERT INTO Game (replayFilename) VALUES (\'"+replayFilename+"\')")
	cnx.commit()

	cursor.execute("SELECT gameID FROM Game WHERE replayFilename = \'"+replayFilename+"\'")
	gameID = cursor.fetchone()['gameID']
	
	cursor.execute("INSERT INTO GameToUser (gameID, userID, rank) VALUES (%d, %d, %d)" % (gameID, winnerID, 0))
	cursor.execute("INSERT INTO GameToUser (gameID, userID, rank) VALUES (%d, %d, %d)" % (gameID, loserID, 1))
	cnx.commit()

	# Delete working path
	shutil.rmtree(workingPath)

while True:
	cursor.execute("SELECT * FROM Submission WHERE problemID = " + str(TRON_PROBLEM_ID))
	submissions = cursor.fetchall()
	submissions.sort(key=lambda x: int(x['score']))
	for submission in submissions:
		allowedDifferenceInScore = 5 / (0.65*random.random())
		allowedOpponents = []
		for possibleOpponent in submissions:
			if submission['userID'] != possibleOpponent['userID'] and abs(submission['score'] - possibleOpponent['score']) < allowedDifferenceInScore:
				allowedOpponents.append(possibleOpponent)
		opponent = allowedOpponents[random.randrange(0, len(allowedOpponents))]

		runGame([submission['userID'], opponent['userID']], [submission['mu'], opponent['mu']], [submission['sigma'], opponent['mu']])
