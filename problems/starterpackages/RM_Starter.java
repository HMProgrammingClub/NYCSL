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

	private static class Room
	{
		public String firstPerson, secondPerson;
		public Room(String firstPerson, String secondPerson) {
			this.firstPerson = firstPerson;
			this.secondPerson = secondPerson;
		}
	}
	
	/**
	 * @param args
	 */
	
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
            	names.add(line);
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
	
	public static void output(String name, ArrayList<ArrayList<String>> solution) {
		PrintWriter writer;
		String filename = name + System.currentTimeMillis();
		try {
			writer = new PrintWriter(filename, "UTF-8");
			for (ArrayList<String> p : solution)
			{
				for(String s : p)
				{
					writer.println(s + " ");
				}
				writer.println();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ArrayList<String> p = getProblem("Your file here");
		
		ArrayList<ArrayList<String>> template;
		
		//There is an error because you need set template to something.
		output("Your name here", template);
	}

}
