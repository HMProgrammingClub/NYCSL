#include "TSP.h"

std::vector<Point> pts;

bool operator==(const Point & p1, const Point & p2) { return p1.x == p2.x && p1.y == p2.y && p1.z == p2.z; }

void randomPoint()
{
	Point next;
	next.x = (rand() % 201) - 100;
	next.y = (rand() % 201) - 100;
	next.z = (rand() % 201) - 100;
	next.index = 0;
	if(std::count(pts.begin(), pts.end(), next)) randomPoint();
	else pts.push_back(next);
}

void tspGenerate()
{
	pts.clear();
	const int NUM_PTS = 500;
	for(int a = 0; a < NUM_PTS; a++)
	{
		randomPoint();
		pts.back().index = a + 1;
	}
	std::ofstream o;
	o.open("tsp-input.txt");
	for(auto a = pts.begin(); a != pts.end(); a++)
	{
		o << a->index << ' ' << a->x << ' ' << a->y << ' ' << a->z << std::endl;
	}
	o.flush();
	o.close();
	return;
}