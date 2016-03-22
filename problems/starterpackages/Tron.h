#include <sstream>
#include <iostream>
#include <vector>
#include <fstream>
#include <time.h>

#define NORTH 0
#define EAST 1
#define SOUTH 2
#define WEST 3

#define EMPTY 0
#define ME 1
#define OPPONENT 2
#define TAKEN_BY_ME 3
#define TAKEN_BY_OPPONENT 4

static std::ofstream debug;

static std::string getString()  {
	std::string newString;
	std::getline(std::cin, newString);
	return newString;
}

static void init() {
	debug.open("debug"+getString()+".log");
}

template<typename T> static void log(T s) {
	debug << s;
}
template<typename T> static void logln(T s) {
	debug << s << '\n';
}

static std::vector< std::vector<int> > deserializeMap(std::string mapString) {
	std::vector<int> tileVals;
	std::istringstream f(mapString);

	std::string s;
	while (std::getline(f,s,' ')) tileVals.push_back(atoi(s.c_str()));

	std::vector< std::vector<int> > map;

	for (int i=0; i<16; i++) {
		std::vector<int> newVec;
		for(auto it = tileVals.begin() + i * 16; it != tileVals.begin() + (i + 1) * 16; it++) newVec.push_back(*it);
		map.push_back(newVec);
	}

	return map;
}

static std::vector< std::vector<int> > getMap() {
	std::string message = getString();
	if(message.compare("KILL") == 0) exit(0);
	return deserializeMap(message);
}

static void sendMove(int move) {
	std::cout << std::to_string(move) << "\n";
}