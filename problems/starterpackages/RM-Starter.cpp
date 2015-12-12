#include <string>
#include <vector>
#include <algorithm>
#include <fstream>
#include <time.h>

std::vector<std::string> getProblem(std::string f)
{
	std::fstream in; std::vector<std::string> answer; std::string i;
	in.open(f, std::ios_base::in);
	while(std::getline(in, i)) answer.push_back(i);
	return answer;
}

void outputSolutionsToFile(const std::string & name, const std::vector< std::vector<std::string> > & s)
{
	std::ofstream output(name + '-' + std::to_string(time(NULL)) + ".txt");
	if(output.is_open()) for(auto a = s.begin(); a != s.end(); a++)
	{
		for(auto b = a->begin(); b != a->end(); b++) output << *b << ' ';
		output << '\n';
	}
	else throw std::runtime_error("Couldn't open file");
}

int main()
{
	std::vector<std::string> problem = getProblem("PUT FILENAME HERE");

	std::vector< std::vector<std::string> > solution;
	//Fill in solution with your solution.



	return EXIT_SUCCESS;
}