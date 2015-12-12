#include "Roomates.h"

void generate(std::string f)
{
	std::fstream file, out;
	file.open(f, std::ios_base::in);
	out.open("Names.txt", std::ios_base::out);
	std::string n;
	std::vector<std::string> names;
	while(std::getline(file, n))
	{
		n = n.substr(0, std::distance(n.begin(), std::find(n.begin(), n.end(), ' ')));
		if(n.size() > 2) names.push_back(n);
	}
	std::random_shuffle(names.begin(), names.end());
	for(auto a = names.begin(); a != names.end(); a++) out << *a << std::endl;
	out.flush();
	out.close();
	file.close();
}