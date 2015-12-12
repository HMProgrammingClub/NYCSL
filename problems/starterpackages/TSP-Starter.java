import java.util.*;
import java.io.*;

public class TSP
{
	private static class Point
	{
		public int x, y, z, index;
		public Point(int x, int y, int z, int index) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.index = index;
		}
	}
	
	public static ArrayList<Point> getProblem(String filename)
	{
		File fileEntry = new File(filename);
		try (BufferedReader br = new BufferedReader(new FileReader(fileEntry)))
		{
			ArrayList<Point> points = new ArrayList<Point>(0);
			int index = 0;
			String line;
			while ((line = br.readLine()) != null)
			{
				String[] components = line.split(" ");
				points.add(new Point( Integer.parseInt(components[1]), Integer.parseInt(components[2]), Integer.parseInt(components[3]), Integer.parseInt(components[0])));
			}
			return points;
			
		} catch(Exception e) {
			e.printStackTrace();
			System.out.println("There was an error reading in your solutions. You should probably find Ben Spector, Luca Koval, or Michael Truell. They will fix this.");
		}
	}
	
	public static void outputSolutionsToFile(String name, ArrayList<Integer> solutions)
	{
		String filename = name + System.currenTimeMillis(), content = new String();
		for(Integer i : solution) content += i.toString() + " ";
		try {
			FileWriter writer = new FileWriter(new File("output.txt"), false);
            writer.write(content);
            writer.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main()
	{
		ArrayList<Point> problem = getProblem("PUT THE FILENAME HERE");
		
		ArrayList<Integer> solution;
		
		//PUT YOUR CODE HERE
		//Fill in solution with your route.

		outputSolutionsToFile("YOUR NAME HERE", solution);
	}
}