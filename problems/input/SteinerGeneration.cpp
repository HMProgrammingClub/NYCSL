#include <random>
#include <fstream>

int main() {
	double min = -100;
	double max = 100;
	std::uniform_real_distribution<double> unif(min, max);
	std::default_random_engine re;
	
	std::ofstream out("st.txt");
	for(int a = 0; a < 1000; a++) out << unif(re) << ' ' << unif(re) << '\n';
	out.flush();
	
	return 0;
}