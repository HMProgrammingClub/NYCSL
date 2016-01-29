from networking import Networker

networker = Networker()
for a in range(2):
	networker.startPlayer(input("Enter the start command for the player " + str(a) + ":"))
gameMap = [[a for a in range(16)] for b in range(16)]