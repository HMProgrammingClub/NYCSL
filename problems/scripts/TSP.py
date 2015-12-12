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
        for w in line.split(' '):
            if len(w) > 0:
                try:
                    nums.append(int(w))
                except ValueError:
                    print('Error')
                    sys.exit(-1)

for a in nums:
    if a > 500 or a < 1:
        print('Error')
        sys.exit(-1)


beenTo = []
for a in range(0, 500):
    beenTo.append(False)

dist = 0.0
for a in range(1, len(nums)):
    if beenTo[nums[a] - 1]:
        print('Error')
        sys.exit(-1)
    beenTo[nums[a] - 1] = True
    b = a - 1
    dist += getDist(pts[nums[b] - 1], pts[nums[a] - 1])
if beenTo[nums[0] - 1]:
    print('Error')
    sys.exit(-1)
beenTo[nums[0] - 1] = True
dist += getDist(pts[nums[0] - 1], pts[nums[-1] - 1])

for a in beenTo:
    if not(a):
        print('Error')
        sys.exit(-1)

print(dist)
