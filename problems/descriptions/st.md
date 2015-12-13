Problem Description:
	In the Steiner Tree Problem, you are given a set of points and the goal is to create line segments which connect all of the given points such that the total distance is as small as possible.
	This means that you are allowed to create points in addition to those you are provided with, and every point can have as many edges connected to it as you wish.
	In this version of the Steiner Tree Problem, you will be given a set of points in three-dimensional space and your goal is to get as close to the optimal solution as you can.
Problem Specifics:
	The input file will be in the format:
		x-1 y-1 z-1
		x-2 y-2 z-2
		x-3 y-3 z-3
		...
		x-100 y-100 z-100
	You will output a list of edges to be in order, where the edges are comprised of whitespace-separated integers which themselves comprise points. An acceptable file would look like:
		e1-p1.x e1-p1.y e1-p1.z e1-p2.x e1-p2.y e1-p2.z
		e2-p1.x e2-p1.y e2-p1.z e2-p2.x e2-p2.y e2-p2.z
		e3-p1.x e3-p1.y e3-p1.z e3-p2.x e3-p2.y e3-p2.z
		...
		eN-p1.x eN-p1.y eN-p1.z eN-p2.x eN-p2.y eN-p2.z
	To aid you with the problem, we are providing starter packages which can be found here. The input file can be found here.
Rules:
		You can use anything on wikipedia for reference. Use of the internet for algorithmic purposes is acceptable, but you may not copy and paste code from the internet. Use of websites such as StackOverflow, python.org, the Java API, and cplusplus.com is encouraged. Collaboration between students is encouraged, but your solutions should be your own.