import sys
import math

class Point:
    def __init__(self, x, y, z, index):
        self.x = x
        self.y = y
        self.z = z
        self.index = index

def getDist(a, b):
    return math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y) + (a.z - b.z)*(a.z - b.z))


for arg in sys.argv:
    filename = arg

input = open('../input/tsp.txt', 'r')
pts = []
for line in input:
    l = line.split()
    index = int(l[0])
    x = int(l[1])
    y = int(l[2])
    z = int(l[3])
    pts.append(Point(x, y, z, index))

nums = []

with open(filename) as fileIn:
    for line in fileIn:
        for w in line.split():
            nums.append(int(w))

beenTo = []
for a in range(0, 200):
    beenTo.append(False)

dist = 0.0
for a in range(1, len(nums)):
    if beenTo[nums[a]]:
        print('Error')
        sys.exit(-1)
    beenTo[nums[a]] = True
    b = a - 1
    dist += getDist(pts[nums[b]], pts[nums[a]])
if beenTo[nums[0]]:
    print('Error')
    sys.exit(-1)
dist += getDist(pts[nums[0]], pts[nums[-1]])

for a in beenTo:
    if not(a):
        print('Error')
        sys.exit(-1)

print(dist)
