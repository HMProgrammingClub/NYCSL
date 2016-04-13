#include "Tron.h"
#include <algorithm>
#include <set>
#include <map>
std::ofstream debug;

//Note: I define Standard Directional Order (which I'll call standard order) to be: NORTH, EAST, SOUTH, WEST.

//Little useful function for debugging, as it will tell us what direction, in words, an integer corresponds to.
inline std::string stringFromDirection(int dir) {
	return dir == 0 ? "NORTH" : dir == 1 ? "EAST" : dir == 2 ? "SOUTH" : dir == 3 ? "WEST" : "NONSENSE";
}

/*This function finds out which squares adjacent to location are empty.
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

//This is an enum which will tell us if somebody has run:
enum Result {
	OUR_VICTORY,
	THEIR_VICTORY,
	BOTH_DEATH
};

std::vector< std::vector<int> > simulateMove(std::vector< std::vector<int> > map, int myMove, int opMove) {
	//Let's figure out where we and our opponent are:
	std::pair<int, int> myLocation, opLocation;
	for(int y = 0; y < 16; y++)  {
		for(int x = 0; x < 16; x++) {
			if(map[y][x] == ME) {
				myLocation = { x, y };
			}
			if(map[y][x] == OPPONENT) {
				opLocation = { x, y };
			}
		}
	}

	map[myLocation.second][myLocation.first] = TAKEN_BY_ME;
	map[opLocation.second][opLocation.first] = TAKEN_BY_OPPONENT;

	auto newMyLocation = getLocation(myLocation, myMove), newOpLocation = getLocation(opLocation, opMove);
	if(newMyLocation == BAD_LOCATION || map[newMyLocation.second][newMyLocation.first] != EMPTY) {
		throw newOpLocation == BAD_LOCATION || map[newOpLocation.second][newOpLocation.first] != EMPTY ? BOTH_DEATH : THEIR_VICTORY;
	}
	if(newOpLocation == BAD_LOCATION || map[newOpLocation.second][newOpLocation.first] != EMPTY) throw OUR_VICTORY;

	map[newMyLocation.second][newMyLocation.first] = ME;
	map[newOpLocation.second][newOpLocation.first] = OPPONENT;

	return map;
}

int voronoiCount(const std::vector< std::vector<int> > & map) {

	//Let's figure out where we and our opponent are:
	std::pair<int, int> myLocation, opLocation;
	for(int y = 0; y < 16; y++)  {
		for(int x = 0; x < 16; x++) {
			if(map[y][x] == ME) {
				myLocation = { x, y };
			}
			if(map[y][x] == OPPONENT) {
				opLocation = { x, y };
			}
		}
	}

	/*Initialize distanceFromMe, which stores how far squares are from me.
	Furthermore, it can also tell me whether a square has been visited by the BFS.*/
	int distanceFromMe[16][16];
	for(int a = 0; a < 16; a++) for(int b = 0; b < 16; b++) distanceFromMe[a][b] = 0;
	
	//Initialize myFront to have only my location in it.
	std::set< std::pair<int, int> > myFront;
	myFront.insert(myLocation);

	//Conduct BFS. Rather than going line by line, I'm going to explain it all here in the hopes that it's more cohesive.
	for(unsigned char dist = 1; myFront.size() != 0; dist++) {
		std::set< std::pair<int, int> > newFront;
		for(auto a = myFront.begin(); a != myFront.end(); a++) {
			auto n = getLocation(*a, NORTH), e = getLocation(*a, EAST), s = getLocation(*a, SOUTH), w = getLocation(*a, WEST);
			if(n != BAD_LOCATION && distanceFromMe[n.second][n.first] == 0 && map[n.second][n.first] == EMPTY) {
				newFront.insert(n);
				distanceFromMe[n.second][n.first] = dist;
			}
			if(e != BAD_LOCATION && distanceFromMe[e.second][e.first] == 0 && map[e.second][e.first] == EMPTY) {
				newFront.insert(e);
				distanceFromMe[e.second][e.first] = dist;
			}
			if(s != BAD_LOCATION && distanceFromMe[s.second][s.first] == 0 && map[s.second][s.first] == EMPTY) {
				newFront.insert(s);
				distanceFromMe[s.second][s.first] = dist;
			}
			if(w != BAD_LOCATION && distanceFromMe[w.second][w.first] == 0 && map[w.second][w.first] == EMPTY) {
				newFront.insert(w);
				distanceFromMe[w.second][w.first] = dist;
			}
		}
		myFront.clear();
		for(auto a = newFront.begin(); a != newFront.end(); a++) myFront.insert(*a);
	}

	/*Initialize distanceFromOp, which stores how far squares are from me.
	Furthermore, it can also tell me whether a square has been visited by the BFS.*/
	int distanceFromOp[16][16];
	for(int a = 0; a < 16; a++) for(int b = 0; b < 16; b++) distanceFromOp[a][b] = 0;

	//Initialize opFront to have only their location in it.
	std::set< std::pair<int, int> > opFront;
	opFront.insert(opLocation);

	//Conduct BFS. Rather than going line by line, I'm going to explain it all here in the hopes that it's more cohesive.
	for(unsigned char dist = 1; opFront.size() != 0; dist++) {
		std::set< std::pair<int, int> > newFront;
		for(auto a = opFront.begin(); a != opFront.end(); a++) {
			auto n = getLocation(*a, NORTH), e = getLocation(*a, EAST), s = getLocation(*a, SOUTH), w = getLocation(*a, WEST);
			if(n != BAD_LOCATION && distanceFromOp[n.second][n.first] == 0 && map[n.second][n.first] == EMPTY) {
				newFront.insert(n);
				distanceFromOp[n.second][n.first] = dist;
			}
			if(e != BAD_LOCATION && distanceFromOp[e.second][e.first] == 0 && map[e.second][e.first] == EMPTY) {
				newFront.insert(e);
				distanceFromOp[e.second][e.first] = dist;
			}
			if(s != BAD_LOCATION && distanceFromOp[s.second][s.first] == 0 && map[s.second][s.first] == EMPTY) {
				newFront.insert(s);
				distanceFromOp[s.second][s.first] = dist;
			}
			if(w != BAD_LOCATION && distanceFromOp[w.second][w.first] == 0 && map[w.second][w.first] == EMPTY) {
				newFront.insert(w);
				distanceFromOp[w.second][w.first] = dist;
			}
		}
		opFront.clear();
		for(auto a = newFront.begin(); a != newFront.end(); a++) opFront.insert(*a);
	}

	/*Finally, let's go through the board and tally up which squares are closer to whom, and then use that to evaluate the position.
	Bear in mind that a value of 0 here actually means that the square is unreachable.
	We'll let the score be equal to the number of squares that are closer to us minus the number closer to them.*/
	int total = 0;
	for(int a = 0; a < 16; a++) for(int b = 0; b < 16; b++) {
		if(distanceFromMe[a][b] == distanceFromOp[a][b]) continue;
		if(distanceFromOp[a][b] == 0 || (distanceFromMe[a][b] < distanceFromOp[a][b] && distanceFromMe[a][b] != 0)) {
			total++;
		}
		else total--;
	}
	return total;
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

		clock_t startTime = clock();
		//Conduct 1-layer minimax search evaluations:
		int results[4][4];
		for(int a = 0; a < 4; a++) {
			for(int b = 0; b < 4; b++) {
				try {
					results[a][b] = voronoiCount(simulateMove(m, a, b));
				}
				catch(Result r) {
					results[a][b] = r == BOTH_DEATH ? 0 : r == THEIR_VICTORY ? -257 : 257;
				}
			}
		}
		double elapsedTime = 1000 * double(clock() - startTime) / CLOCKS_PER_SEC;

		dbg::logln("-----------------------------------------------------\nDebug for turn #" + std::to_string(turnNumber) + ':');
		dbg::logln("Minimax evaluation time took " + std::to_string(elapsedTime) + " milliseconds.");
		for(int a = 0; a < 4; a++) {
			for(int b = 0; b < 4; b++) {
				dbg::logln("If I move " + stringFromDirection(a) + ", and they move " + stringFromDirection(b) + ", my resulting value will be " + std::to_string(results[a][b]));
			}
		}

		//Find minimax move.
		int miniResults[4];
		for(int a = 0; a < 4; a++) {
			miniResults[a] = *std::min_element(results[a], results[a] + 4);
		}
		sendMove(std::max_element(miniResults, miniResults + 4) - miniResults);
	}
}