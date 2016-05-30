#include <fstream>
#include <string>
#include <iostream>
#include <stdexcept>
#include <vector>

// Helper structs for dealing with points and edges.
struct Point {
	double x, y;
};
struct Edge {
	Point p1, p2;
};

// Gets a problem from a file as a vector of points.
std::vector<Point> getProblem(const std::string & filename) {
	std::vector<Point> pts(1000); //Number of points
	std::ifstream input(filename);
	if(input.is_open()) for(auto a = pts.begin(); a != pts.end(); a++) input >> a->x >> a->y;
	else {
		std::cout << "Couldn't open input file.";
		getchar();
		exit(EXIT_FAILURE);
	}
	input.close();
	return pts;
}

// Outputs a vector of edges to file out.txt for submission.
void outputSolutionsToFile(const std::vector<Edge> & s) {
	std::ofstream output("out.txt");
	if(output.is_open()) for(auto a = s.begin(); a != s.end(); a++) output << a->p1.x << ' ' << a->p1.y << ' ' << a->p2.x << ' ' << a->p2.y << '\n';
	else {
		std::cout << "Couldn't open output file";
		getchar();
		exit(EXIT_FAILURE);
	}
	output.close();
}

int main() {

	std::vector<Point> problem;
	problem = getProblem("st.txt"); // Gets the problem from st.txt as a vector of points.

	std::vector<Edge> solution; // Where you should put the edges that make up your solution tree.

	// This code creates edges in the order the points were given.
	for(auto a = problem.begin(); a != problem.end(); a++) {
		Edge e{ *a, *a };
		solution.push_back(e);
	}

	outputSolutionsToFile(solution); // Outputs your solution to out.txt for submission.

	return EXIT_SUCCESS;
}