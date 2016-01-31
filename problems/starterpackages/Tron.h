#include <sstream>
#include <iostream>
#include <vector>

enum Direction { NORTH, EAST, SOUTH, WEST };

enum Tile {
	EMPTY, PLAYER1, PLAYER2, 
	TAKEN_BY_PLAYER1, TAKEN_BY_PLAYER2
};

static std::vector< std::vector<int> > deserializeMap(std::string mapString) {
	std::vector<int> tileVals;
	std::istringstream f(mapString);

	std::string s;
	while (std::getline(f,s,' ')) tileVals.push_back(atoi(s.c_str()));

	std::vector< std::vector<int> > map;

	for (int i=0; i<16; i++) {
		std::vector<int>::const_iterator first = tileVals.begin() + i*16;
		std::vector<int>::const_iterator last = tileVals.begin() + (i+1)*16;
		std::vector<int> newVec(first, last);
		map.push_back(newVec);
	}

	return map;
}

static std::string getString()  {
	std::string newString;
	std::getline(std::cin, newString);
	return newString;
}

static std::vector< std::vector<int> > getMap() {
	std::string message = getString();
	if(message.compare("KILL") == 0) exit(0);
	return deserializeMap(message);
}

static void sendMove(int move) {
	std::cout << std::to_string(move) << "\n";
}