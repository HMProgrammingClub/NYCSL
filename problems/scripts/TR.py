import sys
import zipfile
from compiler import *
import platform
import json

def unpack(filePath, destinationFilePath):
	#folderPath = os.path.dirname(destinationFilePath)
	tempPath = os.path.join(destinationFilePath, "bot")
	os.mkdir(tempPath)
	
	# Extract the archive into a folder call 'bot'
	if platform.system() == 'Windows':
		os.system("7z x -o"+tempPath+" -y "+filePath+". > NUL")
	else:
		print("unzip -u -d"+tempPath+" "+filePath+" > /dev/null 2> /dev/null")
		os.system("unzip -u -d"+tempPath+" "+filePath+" > /dev/null 2> /dev/null")

	# Remove __MACOSX folder if present
	macFolderPath = os.path.join(tempPath, "__MACOSX")
	if os.path.exists(macFolderPath) and os.path.isdir(macFolderPath):
		shutil.rmtree(macFolderPath)

	# Copy contents of bot folder to folderPath remove bot folder
	for filename in os.listdir(tempPath):
		shutil.move(os.path.join(tempPath, filename), os.path.join(destinationFilePath, filename))
	
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

def compile(zipFilename):
	# Setup working path
	workingPath = "workingPath"
	if os.path.exists(workingPath):
		shutil.rmtree(workingPath)	
	os.makedirs(workingPath)
	os.chmod(workingPath, 0o777)

	unpack(zipFilename, workingPath)

	language, errors = compile_anything(workingPath)
	didCompile = True if errors == None else False
	if didCompile:
		zipFolder(workingPath, zipFilename)
	shutil.rmtree(workingPath)
	
	if didCompile:
		print(json.dumps({"isError": False, "message": "Your bot compiled correctly!"}))
	else:
		print(json.dumps({"isError": True, "message": "There was an error compiling your bot. Error message: \""+str(errors)+"\""}))
compile(sys.argv[-1])
