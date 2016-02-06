import java.util.*;
import java.io.*;

public class Tron {

	//We can't print to console, because that channel is used for IO with the environment.
	//We therefore create a PrintWriter and output to that. Use "OutputDebug" rather than "System.out.print".
	public static PrintWriter debug;
	public static <T> void outputDebug(T s) {
		if(debug == null) {
			try {
				debug = new PrintWriter("debug-" + (System.currentTimeMillis() / 1000) + ".log"); //Cast to seconds.
			} catch(Exception e) {
				System.out.println("Debug file could not be open.");
				System.exit(1);
			}
		}
		debug.print(s);
		debug.flush();
	}

	public static enum Direction {
		NORTH, EAST, SOUTH, WEST
	}

	public static enum Tile {
		EMPTY, PLAYER1, PLAYER2, 
		TAKEN_BY_PLAYER1, TAKEN_BY_PLAYER2
	}

	private static int[][] deserializeMap(String mapString) {
		String[] tiles = mapString.trim().split(" ");
		int[] tileVals = new int[tiles.length];
		for (int i=0; i<tiles.length; i++) tileVals[i] = Integer.parseInt(tiles[i].trim());

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

	public static int[][] getMap() {
		String message = getString().trim();
		if(message.equals("KILL")) {
			outputDebug("exit");
			System.exit(0);
		}
		return deserializeMap(message);
	}

	public static void sendMove(Direction move) {
		System.out.print(move.ordinal()+"\n");
		System.out.flush();
	}
}