import zipfile
from compiler import *

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

def zipFolder(folderPath, destinationFilePath):
	zipFile = zipfile.ZipFile(destinationFilePath, "w", zipfile.ZIP_DEFLATED)

	originalDir = os.getcwd()
	os.chdir(folderPath)

	for rootPath, dirs, files in os.walk("."):
		for file in files:
			if os.path.basename(file) != os.path.basename(destinationFilePath):
				zipFile.write(os.path.join(rootPath, file))

	zipFile.close()

	os.chdir(originalDir)

def compile(userID):
	# Setup working path
	workingPath = "workingPath"
	if os.path.exists(workingPath):
		shutil.rmtree(workingPath)	
	os.makedirs(workingPath)
	os.chmod(workingPath, 0o777)

	unpack(os.path.join("../outputs", str(userID)+".zip"), workingPath)

	language, errors = compile_anything(workingPath)
	didCompile = True if errors == None else False

	if didCompile:
		zipFolder(workingPath, os.path.join("../outputs", str(userID)+".zip"))
		
	shutil.rmtree(workingPath)
