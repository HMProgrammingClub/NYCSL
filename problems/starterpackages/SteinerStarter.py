import math
import sys

# A helper class for working with points.
class Point:
	def __init__(self, x, y):
		self.x = x
		self.y = y
class Edge:
	def __init__(self, p1, p2):
		self.p1 = p1
		self.p2 = p2
		
pts = [] # Where you will find the input points.
edges = [] # Edges should be added to this.

# Gets the input points from st.txt for you.
with open('st.txt', 'r') as input:
	for line in input:
		l = line.split(' ')
		pts.append(Point(float(l[0]), float(l[1])))
		
# Your code here. This sample code just connects the points in the order that they are given:
for a in range(1, len(pts)):
	edges.append(Edge(pts[a-1], pts[a]))

# Outputs your edges to file out.txt for submission.
f = open('out.txt', 'w')
for a in edges:
	f.write(str(a.p1.x) + ' ' + str(a.p1.y) + ' ' + str(a.p2.x) + ' ' + str(a.p2.y) + '\n')