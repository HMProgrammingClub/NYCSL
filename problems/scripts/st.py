import sys
import math
import json

class Vertex:
	def __init__(self, x, y, neighbors = None, visited = None):
		self.x = x
		self.y = y
		self.neighbors = neighbors if neighbors is not None else []
		self.visited = visited if visited is not None else False
	def addNeighbor(self, v):
		self.neighbors.append(v)

for arg in sys.argv:
    filename = arg

pts = []
vertices = {}
dist = 0

# Get the points from the input file.
with open('../input/st.txt', 'r') as input:
	for line in input:
		l = line.split(' ')
		pts.append(((float(l[0]), float(l[1]))))

# Get their points and set the edges accordingly. Add the length of each edge to the total length of the tree.
with open(filename, 'r') as input:
	for line in input:
		l = line.split(' ')
		x1 = float(l[0])
		y1 = float(l[1])
		x2 = float(l[2])
		y2 = float(l[3])
		if not (x1, y1) in vertices:
			vertices[((x1, y1))] = Vertex(x1, y1)
		if not ((x2, y2)) in vertices:
			vertices[((x2, y2))] = Vertex(x2, y2)
		vertices[((x1, y1))].addNeighbor(vertices[((x2, y2))])
		vertices[((x2, y2))].addNeighbor(vertices[((x1, y1))])
		dist += math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2))
	
# print(vertices)
	
# Ensure that all input points are included by their solution.
for a in pts:
	if not a in vertices:
		print(json.dumps({"isError": True, "message": "Your graph does not include all of the input points."}))
		sys.exit(-1)

# Traverse the graph.
toVisit = [vertices[pts[0]]]
while len(toVisit) is not 0:
	toVisit[0].visited = True
	v = toVisit.pop(0)
	for a in v.neighbors:
		if not a.visited:
			toVisit.append(a)

# Ensure that all input points are visited. Return distance if so or error if not.
for a in pts:
	if not vertices[a].visited:
		print(json.dumps({"isError": True, "message": "Your graph is not connected."}))
		sys.exit(-1)
print(json.dumps({"isError": False, "score": dist, "message": "You got a score of " + str(dist) + "!"}))