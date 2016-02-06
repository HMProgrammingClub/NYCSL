import java.util.*;
import java.io.*;

public class Tron {

	//We can't print to console, because that channel is used for IO with the environment.
	//We therefore create a PrintWriter and output to that. Use "OutputDebug" rather than "System.out.print".
	public static PrintWriter debug;
	public static <T> void log(T s) {
		if(debug != null) {
			debug.append(s+"\n");
			debug.flush();
		}
	}

	public static enum Direction {
		NORTH, EAST, SOUTH, WEST
	}

	public static enum Tile {
		EMPTY, ME, OPPONENT, 
		TAKEN_BY_ME, TAKEN_BY_OPPONENT
	}

	public static void init() {
		try {
			debug = new PrintWriter(new FileOutputStream(new File("debug"+getString().trim()+".log"))); //Cast to seconds.
		} catch(Exception e) {
			System.out.println("Debug file could not be open.");
			System.exit(1);
		}
	}

	private static ArrayList<ArrayList<Tile>> deserializeMap(String mapString) {
		String[] tiles = mapString.trim().split(" ");
		int[] tileVals = new int[tiles.length];
		for (int i=0; i<tiles.length; i++) tileVals[i] = Tile.values()[Integer.parseInt(tiles[i].trim())];

		int[][] map = new int[16][16];
		for (int i=0; i<16; i++) map[i] = Arrays.copyOfRange(tileVals,i*16,(i+1)*16);
		return map;
	}

	private static String getString() {
		try {
			StringBuilder builder = new StringBuilder();
			int buffer;
			while ((buffer = System.in.read()) >= 0) {
				if (buffer == '\n') {
					break;
				} else {
					builder = builder.append((char)buffer);
				}
			}
			return builder.toString();
		} catch(Exception e) {
			System.exit(1);
			return null;
		}
    }

	public static ArrayList<ArrayList<Tile>> getMap() {
		String message = getString().trim();
		if(message.equals("KILL")) {
			System.exit(0);
		}
		return deserializeMap(message);
	}

	public static void sendMove(Direction move) {
		System.out.print(move.ordinal()+"\n");
		System.out.flush();
	}
}