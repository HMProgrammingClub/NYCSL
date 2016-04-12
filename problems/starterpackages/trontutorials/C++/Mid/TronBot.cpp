#include "Tron.h"
#include <algorithm>
#include <set>
std::ofstream debug;

//Note: I define Standard Directional Order (which I'll call standard order) to be: NORTH, EAST, SOUTH, WEST.

//Little useful function for debugging, as it will tell us what direction, in words, an integer corresponds to.
inline std::string stringFromDirection(int dir) {
	return dir == 0 ? "NORTH" : dir == 1 ? "EAST" : dir == 2 ? "SOUTH" : dir == 3 ? "WEST" : "NONSENSE";
}

/*This function finds out which squares Bot3 to location are empty.
It returns in the standard order of NORTH, EAST, SOUTH, and WEST as booleans which are true if the square is empty.
Note that this function DOES create dynamic memory. Make sure to delete it when you're done.*/
inline bool * emptyAjacentSquares(const std::vector< std::vector<int> > & map, const std::pair<int, int> & location) {
	bool * empty = new bool[4];
	empty[NORTH] = location.second != 15 && map[location.second + 1][location.first] == EMPTY;
	empty[EAST] = location.first != 15 && map[location.second][location.first + 1] == EMPTY;
	empty[SOUTH] = location.second != 0 && map[location.second - 1][location.first] == EMPTY;
	empty[WEST] = location.first != 0 && map[location.second][location.first - 1] == EMPTY;
	return empty;
}

//This is something to return if the square we want to return doesn't exist, and correspondingly something to compare against.
#define BAD_LOCATION std::pair<int, int>{ -1, -1 }

//This will give us the square we'd get to if we tried to move in direction dir from location.
inline std::pair<int, int> getLocation(const std::pair<int, int> & location, int dir) {
	if(dir == NORTH) return location.second == 15 ? BAD_LOCATION : std::pair<int, int>{ location.first, location.second + 1 };
	if(dir == EAST) return location.first == 15 ? BAD_LOCATION : std::pair<int, int>{ location.first + 1, location.second };
	if(dir == SOUTH) return location.second == 0 ? BAD_LOCATION : std::pair<int, int>{ location.first, location.second - 1 };
	if(dir == WEST) return location.first == 0 ? BAD_LOCATION : std::pair<int, int>{ location.first - 1, location.second };
	throw std::runtime_error("No such direction exists.");
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
		bool * safe = emptyAjacentSquares(m, myLocation);

		//Let's look at the counts of empty squares around the possible squares to go to:
		int dirEmptyCount[4];
		for(int a = 0; a < 4; a++) if(safe[a]) {
			//Get the location we would be in if we went in a certain direction (specified by a).
			std::pair<int, int> possibleSquare = getLocation(myLocation, a);
			//Make sure that square exists:
			if(possibleSquare != BAD_LOCATION) {
				//Find the squares around that square:
				bool * around = emptyAjacentSquares(m, possibleSquare);
				//Count the number of empty squares around that square and set it in our array:
				dirEmptyCount[a] = std::count(around, around + 4, true);
				//Cleanup:
				delete[] around;
			}
		}
		else dirEmptyCount[a] = 5; //Irrelevant, but we must ensure it's as large as possible because we don't want to go there.

		dbg::logln("-----------------------------------------------------\nDebug for turn #" + std::to_string(turnNumber) + ':');
		for(int a = 0; a < 4; a++) dbg::logln("Direction " + std::to_string(a) + " is " + (safe[a] ? "safe " : "not safe ") + "and has " + std::to_string(dirEmptyCount[a]) + " Bot3 empty squares.");

		//We'll go in the direction that has the most walls Bot3 to it and is free to go to. If there's a tie we use standard order.
		sendMove(std::min_element(dirEmptyCount, dirEmptyCount + 4) - dirEmptyCount);
		
		delete[] safe; //Cleanup
	}
}