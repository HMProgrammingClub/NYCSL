import time

# Loads in names of all roommates from the input file into an list
def getProblem(filename):
	problem = []
	with open(filename, 'r') as file:
		for line in file:
			problem.append(line.strip())
	return problem

# Outputs your solution to a text file
# The solutions should be a two dimensional list of names
# Each list inside the solution list represents a room
# For example, if you want John and Josh to be roommates and Bill, Billy, and Bob to be roommates, 
# your solution would look like this: [[John, Josh], [Bob, Bill, Billy]]
def outputSolutionToFile(name, solution):
	filename = name + str(time.time()) + ".txt"
	content = ""
	for room in solution:
		for name in room:
			content += name + " "
		content += '\n'
	open(filename, "w").write(content)

# Get the names of all the roommates and put them in the names list
# Make sure that this code can access the input file 
# and that the input file is named rm.txt
names = getProblem("rm.txt")

# Will be a 2-d list of names. Every list inside this list represents a room.
solution = []

# EXAMPLE SOLUTION: put people into rooms of two using their order in the names list
for index in range(0, len(names), 4):
	room = [names[index], names[index+1], names[index+2], names[index+3]]
	solution.append(room)

outputSolutionToFile("PUT YOUR NAME HERE", solution)
