import java.io.*;
import java.util.*;

public class RM_Starter {
	// Loads in names of all roommates from the input file into an ArrayList
	public static ArrayList<String> getProblem(String filename) {
		String line;

		try {
            // FileReader reads text files in the default encoding.
			FileReader fileReader = new FileReader(filename);

            // Always wrap FileReader in BufferedReader.
			BufferedReader bufferedReader = new BufferedReader(fileReader);

			ArrayList<String> names = new ArrayList<String>(0);
			while((line = bufferedReader.readLine()) != null) {
				names.add(line.trim());
			} 

			bufferedReader.close();   
			return names;
		} catch(FileNotFoundException ex) {
			System.out.println("Unable to open file '"+filename+"'");                
		} catch(IOException ex) {
			System.out.println("Error reading file '"+filename+"'");                  
		} return null;
	}

	/* Outputs your solution to a text file
	 * The solutions should be a two dimensional ArrayList of names
	 * Each ArrayList inside the solution ArrayList represents a room
	*/
	public static void output(String name, ArrayList<ArrayList<String>> solution) {
		PrintWriter writer;
		String filename = name + System.currentTimeMillis() + ".txt";
		try {
			writer = new PrintWriter(filename, "UTF-8");
			for (ArrayList<String> p : solution) {
				for(String s : p) writer.print(s + " ");
				writer.println();
			} writer.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		// Get the names of all the roommates and put them in the names ArrayList
		// Make sure that this code can access the input file 
		// and that the input file is named rm.txt
		ArrayList<String> names = getProblem("rm.txt");
		
		// Will be a 2-d ArrayList of names. Every ArrayList inside this ArrayList represents a room.
		ArrayList<ArrayList<String>> solution = new ArrayList<ArrayList<String>>();

		// EXAMPLE SOLUTION: put people into rooms of two using their order in the names ArrayList
		for(int a = 0; a < names.size(); a += 4) {
			ArrayList<String> room = new ArrayList<String>();
			room.add(names.get(a));
			room.add(names.get(a+1));
			room.add(names.get(a+2));
			room.add(names.get(a+3));

			solution.add(room);
		}
		
		output("PUT NAME HERE", solution);
	}
}
