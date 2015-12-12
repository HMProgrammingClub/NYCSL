import sys
import math

for arg in sys.argv:
	filename = arg

input = open('../problems/input/rm.txt', 'r')
names = []
for line in input:
	line = line.rstrip()
	names.append(line)

namesSet = set(names)

finalList = []
alreadyUsed = []

with open(filename) as fileIn:
	for line in fileIn:
		listy = []
		for w in line.split(' '):
			w = w.rstrip()
			if w in namesSet: #and not(w in alreadyUsed):
				listy.append(w)
				alreadyUsed.append(w)
			else:
				print('ERROR')
				sys.exit(-1)
		finalList.append(listy)

finalSum = 0.0
for listy in finalList:
	letters = {}
	for a in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
		letters[a] = 65535
		for n in listy:
			if n.count(a) < letters[a]:
				letters[a] = n.count(a)
	summy = 0
	for a in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
		summy += letters[a]
	finalSum += len(listy) * len(listy) * summy

print(int(finalSum))



