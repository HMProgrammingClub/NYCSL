import time


class Point:
    def __init__(self, x, y, z, index):
        self.x = x
        self.y = y
        self.z = z
        self.index = index


def getProblem(f):
    problem = []
    with open(f, 'r') as file:
        for line in file:
            components = line.split(' ')
            problem.append(Point(int(components[1]), int(components[2]), int(components[3]), int(components(0))))
    return problem


def outputSolutionToFile(name, solution):
    filename = name + str(time.time()) + ".txt"
    content = ""
    for i in solution:
        content += str(i) + ' '
    open(filename, "w").write(content)


problem = getProblem("PUT FILENAME HERE")

solution = []

# Put your code here and add your path to the solutions list.
# It should be just a list of integers.

outputSolutionToFile("PUT YOUR NAME HERE", solution)
