#include "Tron.h"
#include <algorithm>
#include <set>
std::ofstream debug;

//Little useful function for debugging, as it will tell us what direction, in words, an integer corresponds to.
inline std::string stringFromDirection(int dir) {
	return dir == 0 ? "NORTH" : dir == 1 ? "EAST" : dir == 2 ? "SOUTH" : dir == 3 ? "WEST" : "NONSENSE";
}

int main() {
	//Seed rand with the time.
	srand(time(NULL));

	//Initialize bot with respect to the Tron Environment.
	init();

	//We'll want to keep track of the turn number to make debugging easier.
	int turnNumber = 0;

	//Execute loop forever (or until game ends)
	while(true) {
		//Update turn number:
		turnNumber++;

		//Gets the newest map. Every int will have a value of EMPTY, ME, OPPONENT, TAKEN_BY_ME, or TAKEN_BY_OPPONENT.
		std::vector< std::vector<int> > m = getMap();

		//Let's figure out where we are:
		std::pair<int, int> myLocation;
		for(int y = 0; y < 16; y++)  {
			for(int x = 0; x < 16; x++) {
				if(m[y][x] == ME) {
					myLocation = { x, y };
				}
			}
		}

		//Let's find out which directions are safe to go in:
		bool safe[4];
		safe[NORTH] = myLocation.second != 15 && m[myLocation.second + 1][myLocation.first] == EMPTY;
		safe[EAST] = myLocation.first != 15 && m[myLocation.second][myLocation.first + 1] == EMPTY;
		safe[SOUTH] = myLocation.second != 0 && m[myLocation.second - 1][myLocation.first] == EMPTY;
		safe[WEST] = myLocation.first != 0 && m[myLocation.second][myLocation.first - 1] == EMPTY;

		dbg::logln("-----------------------------------------------------\nDebug for turn #" + std::to_string(turnNumber) + ':');
		for(int a = 0; a < 4; a++) dbg::logln("Direction " + std::to_string(a) + " is " + (safe[a] ? "safe." : "not safe."));

		/*Let's see if there's a safe direction to go in.
		If so, we'll go that way, preferentially North, East, South, and then West.
		If not, we'll just go North.*/
		bool * safeLoc = std::find(safe, safe + 4, true);
		if(safeLoc != safe + 4) {
			sendMove(safeLoc - safe);
		}
		else {
			sendMove(NORTH);
		}
	}
}