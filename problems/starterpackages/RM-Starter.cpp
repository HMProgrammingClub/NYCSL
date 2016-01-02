#include <string>
#include <vector>
#include <algorithm>
#include <fstream>
#include <time.h>

using namespace std;

// Loads in names of all roommates from the input file into a vector
vector<string> getProblem(string f)
{
	fstream in; vector<string> answer; string i;
	in.open(f, ios_base::in);
	while(getline(in, i)) answer.push_back(i);
	return answer;
}


/* Outputs your solution to a text file
 * The solutions should be a two dimensional vector of names
 * Each vector inside the solution vector represents a room
*/
void outputSolutionsToFile(const string & name, const vector< vector<string> > & s)
{
	ofstream output(name + '-' + to_string(time(NULL)) + ".txt");
	if(output.is_open()) for(auto a = s.begin(); a != s.end(); a++)
	{
		for(auto b = a->begin(); b != a->end(); b++) output << *b << ' ';
		output << '\n';
	}
	else throw runtime_error("Couldn't open file");
}

int main()
{
	// Get the names of all the roommates and put them in the names vector
	// Make sure that this code can access the input file 
	// and that the input file is named input.txt
	vector<string> names = getProblem("rm.txt");

	// Will be a 2-d vector of names. Every vector inside this vector represents a room.
	vector< vector<string> > solution;

	// EXAMPLE SOLUTION: put people into rooms of two using their order in the names vector
	for(int a = 0; a < names.size(); a += 2) {
		vector<string> room;
		room.push_back(names[a]);
		room.push_back(names[a+1]);

		solution.push_back(room);
	}

	outputSolutionsToFile("PUT YOU NAME HERE", solution);

	return EXIT_SUCCESS;
}