import java.util.*;
import java.io.*;

public class SteinerStarter {
	// Helper classes for dealing with points and edges.
	private static class Point {
		public double x, y;
		public Point(double x, double y) {
			this.x = x;
			this.y = y;
		}
	}
	private static class Edge {
		public Point p1, p2;
		public Edge(Point p1, Point p2) {
			this.p1 = p1;
			this.p2 = p2;
		}
	}
	
	// Gets a problem from a file as an ArrayList of points.
	public static ArrayList<Point> getProblem(String filename) {
		File fileEntry = new File(filename);
		ArrayList<Point> points = new ArrayList<Point>(0);
		try (BufferedReader br = new BufferedReader(new FileReader(fileEntry))) {
			String line;
			while ((line = br.readLine()) != null) {
				String[] components = line.split(" ");
				points.add(new Point(Double.parseDouble(components[0]), Double.parseDouble(components[1])));
			}
		} catch(Exception e) {
			e.printStackTrace();
			System.out.println("There was an error reading in the input problem.");
		}
		return points;
	}
	
	// Outputs an ArrayList of edges to file out.txt for submission.
	public static void outputSolutionsToFile(ArrayList<Edge> solution) {
		String filename = "out.txt", content = new String();
		for(Edge i : solution) content += i.p1.x + " " + i.p1.y + " " + i.p2.x + " " + i.p2.y + "\n";
		try {
			FileWriter writer = new FileWriter(new File(filename), false);
            writer.write(content);
            writer.close();
		} catch(Exception e) {
			e.printStackTrace();
			System.out.println("There was an error outputting your solution.");
		}
	}
	
	public static void main(String [] args) {
		ArrayList<Point> problem = getProblem("st.txt"); // Gets the problem from st.txt as an ArrayList of points.
		
		ArrayList<Edge> solution = new ArrayList<Edge>(); // Where you should put the edges that make up your solution tree.
		
		// This code creates edges in the order the points were given.
		for(int a = 1; a < problem.size(); a++) {
			solution.add(new Edge(problem.get(a-1), problem.get(a)));
		}

		outputSolutionsToFile(solution); // Outputs your solution to out.txt for submission.
	}
}