f = open('test.txt', 'w')

for a in range(1, 501):
    f.write(str(a))
    f.write(' ')

f.flush()
f.close()