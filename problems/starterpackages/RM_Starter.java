import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RM_Starter {
	// Loads in names of all roommates from the input file into an ArrayList
	public static ArrayList<String> getProblem(String filename)
	{
		String line = null;
		
		try {
            // FileReader reads text files in the default encoding.
            FileReader fileReader = 
                new FileReader(filename);

            // Always wrap FileReader in BufferedReader.
            BufferedReader bufferedReader = 
                new BufferedReader(fileReader);

            ArrayList<String> names = new ArrayList<String>(0);
           
            while((line = bufferedReader.readLine()) != null) {
            	names.add(line.trim());
            }
            
            bufferedReader.close();   
            
            return names;
        }
        catch(FileNotFoundException ex) {
            System.out.println(
                "Unable to open file '" + 
                filename + "'");                
        }
        catch(IOException ex) {
            System.out.println(
                "Error reading file '" 
                + filename + "'");                  
            // Or we could just do this: 
            // ex.printStackTrace();
        }
		return null;
	}

	/* Outputs your solution to a text file
	 * The solutions should be a two dimensional vector of names
	 * Each vector inside the solution vector represents a room
	*/
	public static void output(String name, ArrayList<ArrayList<String>> solution) {
		PrintWriter writer;
		String filename = name + System.currentTimeMillis() + ".txt";
		try {
			writer = new PrintWriter(filename, "UTF-8");
			int index = 0;
			for (ArrayList<String> p : solution)
			{
				index++;
				for(String s : p)
				{
					writer.print(s + " ");
				}
				writer.println();
			}
			writer.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		// Get the names of all the roommates and put them in the names vector
		// Make sure that this code can access the input file 
		// and that the input file is named input.txt
		ArrayList<String> names = getProblem("rm.txt");
		
		// Will be a 2-d vector of names. Every vector inside this vector represents a room.
		ArrayList<ArrayList<String>> solution = new ArrayList<ArrayList<String>>();

		// EXAMPLE SOLUTION: put people into rooms of two using their order in the names vector
		for(int a = 0; a < names.size(); a += 2) {
			ArrayList<String> room = new ArrayList<String>();
			room.add(names.get(a));
			room.add(names.get(a+1));

			solution.add(room);
		}
		System.out.println(solution.size());

		output("PUT NAME HERE", solution);
	}

}
