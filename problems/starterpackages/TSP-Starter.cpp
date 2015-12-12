#include <vector>
#include <iostream>
#include <fstream>
#include <string>
#include <time.h>

struct Point
{
	int x, y, z, index;
};

//Gets the problem as a vector of points from a specified filename.
std::vector<Point> getProblem(const std::string & filename)
{
	std::vector<Point> pts;
	pts.resize(500); //Number of points
	std::ifstream f;
	f.open(filename);
	for(int a = 0; a < 500; a++) f >> pts[a].index >> pts[a].x >> pts[a].y >> pts[a].z;
	f.close();
}

void outputSolutionsToFile(const std::string & name, const std::vector<int> & s)
{
	std::ofstream output(name + '-' + std::to_string(time(NULL)) + ".txt");
	if(output.is_open()) for(auto a = s.begin(); a != s.end(); a++) output << *a << ' ';
	else throw std::runtime_error("Couldn't open file");
}

int main()
{
	std::vector<Point> problem = getProblem("tsp.txt");
	
	std::vector<int> solution;
	
	//Put your code here to create the solution.

	outputSolutionsToFile("YOUR-NAME-HERE", solution);

	system("PAUSE");
	return EXIT_SUCCESS;
}