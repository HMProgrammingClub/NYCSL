import subprocess
from threading import Thread
from time import sleep

def monitorFile(connection, queue):
	while True:
		try:
			line = connection.readline()
		except:
			break

		if not line:
			queue.append(None)
			break
		line = line.rstrip("\n")
		queue.append(line)

class Networker:
	def __init__(self):
		self.processes = []
		self.stdoutQueues = []
		self.stderrQueues = []

	def startPlayer(self, command):
		self.processes.append(subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, universal_newlines=True))

		self.stdoutQueues.append([])
		self.stderrQueues.append([])
		
		stdoutMonitor = Thread(target=monitorFile, args=(self.processes[-1].stdout, self.stdoutQueues[-1]))
		stdoutMonitor.daemon = True
		stdoutMonitor.start()

		stderrMonitor = Thread(target=monitorFile, args=(self.processes[-1].stderr, self.stderrQueues[-1]))
		stderrMonitor.daemon = True
		stderrMonitor.start()
		
	def serializeMap(self, map):
		returnString = ""
		for row in returnString:
			for tile in row:
				returnString += str(int(tile)) + " "
		return returnString

	def frameNetworking(self, map, isSecond):
		self.processes[isSecond].stdin.write(self.serializeMap(map) + "\n")
		self.processes[isSecond].stdin.flush()

		# Return move
		while len(self.stdoutQueues[isSecond]) == 0:
			sleep(0.01)
		return int(self.stdoutQueues[isSecond].pop())

	def killAll(self):
		for a in range(len(self.processes)):
			self.processes[a].kill()