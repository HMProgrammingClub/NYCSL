import sys
import math

class Point:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

class Edge:
    def __init__(self, a, b):
        self.p1 = a
        self.p2 = b
        self.distance = math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y) + (a.z - b.z)*(a.z - b.z))

for arg in sys.argv:
    filename = arg

pts = []

with open('../problems/input/st.txt', 'r') as input:
    for line in input:
        l = line.split(' ')
        pts.append(int(l[0]), int(l[1]), int(l[2]))


