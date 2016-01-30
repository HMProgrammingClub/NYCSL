import os
import os.path
import stat
import platform
import trueskill


def unpack(filePath, destinationFilePath):
	folderPath = os.path.dirname(filePath)
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

	# Copy contents of bot folder to folderPath remove bot folder
	for filename in os.listdir(tempPath):
		shutil.move(os.path.join(tempPath, filename), os.path.join(folderPath, filename))
	
	shutil.rmtree(tempPath)
	os.remove(filePath)

def selectMatch():
	pass

def runGame(width, height, userIDs, muValues, sigmaValues, backend):
	# Setup working path
	workingPath = "workingPath"
	if os.path.exists(workingPath):
		shutil.rmtree(workingPath)	
	os.makedirs(workingPath)
	os.chmod(workingPath, 0o777)

	# Unpack and setup bot files
	botPaths = [os.path.join(workingPath, str(userID)) for userID in userIDs]
	for botPath in botPaths: os.mkdir(botPath)
	for a in range(len(userIDs)): unpack("../outputs/"+ str(userID) + ".zip", botPaths[a])
	for bothPath in botPaths: os.chmod(os.path.join(botPath, "run.sh"), os.stat(os.path.join(botPath, "run.sh")).st_mode | stat.S_IEXEC)
	
	# Build the shell command that will run the game. Executable called environment houses the game environment
	runGameShellCommand = "./environment "+str(width)+" "+str(height)+" "
	for bothPath in botPaths: runGameShellCommand += "\"cd "+os.path.abspath(bothPath)+"; "+os.path.join(os.path.abspath(bothPath), "run.sh")+"\" "
	print(runGameShellCommand)

	# Run game
	shellOutput = os.popen(runGameShellCommand).read()
	print(shellOutput)
	
	lines = shellOutput.split("\n")
	lines.remove("")
	
	# Get player ranks and scores by parsing shellOutput
	winnerNumber = lines[-2][len("Player ") : -len("won!")]
	winnerID = userIDs[winnerNumber-1]
	loserID = 1 if winnerID == 0 else 0

	# Update trueskill mu and sigma values
	teams = []
	teams.append([trueskill.Rating(mu=float(muValues[winnerID]), sigma=float(sigmaValues[winnerID]))])
	teams.append([trueskill.Rating(mu=float(muValues[loserID]), sigma=float(sigmaValues[loserID]))])
	newRatings = [ratingTuple[0] for ratingTuple in trueskill.rate(teams)]

	# Get replay file by parsing shellOutput
	replayFilename = lines[-1][len("Output file is stored at ") : len(lines[-1])]
	
	# Delete working path
	shutil.rmtree(workingPath)