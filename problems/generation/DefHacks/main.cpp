#include <string>
#include <vector>
#include <fstream>

int main()
{
	std::fstream f; f.open("../../input/rm.txt", std::ios_base::in);
	std::fstream o; o.open("Test.txt", std::ios_base::out);
	for(int a = 0; a < 2500; a++)
	{
		std::string n1, n2; std::getline(f, n1); std::getline(f, n2);
		o << n1 << ' ' << n2 << std::endl;
	}
	o.flush();
	o.close();
	f.close();
}