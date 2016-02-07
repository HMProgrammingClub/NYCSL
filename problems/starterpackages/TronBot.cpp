#include "Tron.h"

int main() {
	init();
	// Execute loop forever (or until game ends)
	while(true) {
		//Gets the newest map. Every int will have a value of EMPTY, ME, OPPONENT, TAKEN_BY_ME, or TAKEN_BY_OPPONENT.
		std::vector< std::vector<int> > m = getMap();
		int myLocX, myLocY, opLocX, opLocY;
		for(int y = 0; y < 16; y++)  {
			for(int x = 0; x < 16; x++) {
				if(m[y][x] == ME) {
					myLocX = x;
					myLocY = y;
				}
				else if(m[y][x] == OPPONENT) {
					opLocX = x;
					opLocY = y;
				}
			}
		}

		//Sample - logs where each player is.
		logln("Me: " + std::to_string(myLocX) + ' ' + std::to_string(myLocY) + "; Opponent: " + std::to_string(opLocX) + ' ' + std::to_string(opLocY));

		//Figure out what direction to go in.

		//Send NORTH, EAST, SOUTH, or WEST
		sendMove(WEST);
	}
}	