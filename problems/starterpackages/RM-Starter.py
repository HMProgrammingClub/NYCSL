import time


def getProblem(filename):
    problem = []
    with open(filename, 'r') as file:
        for line in file:
            problem.append(line)
    return problem


def outputSolutionToFile(name, solution):
    filename = name + str(time.time()) + ".txt"
    content = ""
    for i in solution:
        for j in i:
            content += j + ' '
        content += '\n'
    open(filename, "w").write(content)
    
problem = getProblem("PUT FILENAME HERE")

solution = []
# Note: You'll have to add lists to this list, as outputSolution accepts a two-dimensional list

# Put your code here and add your path to the solutions list.
# It should be just a list of integers.

outputSolutionToFile("PUT YOUR NAME HERE", solution)
