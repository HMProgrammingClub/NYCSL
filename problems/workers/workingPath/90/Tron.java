import java.util.*;

public class Tron {

	public static enum Direction {
		NORTH, EAST, SOUTH, WEST
	}

	public static enum Tile {
		EMPTY, PLAYER1, PLAYER2, 
		TAKEN_BY_PLAYER1, TAKEN_BY_PLAYER2
	}

	private static int[][] deserializeMap(String mapString) {
		String[] tiles = mapString.split(" ");
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
		String message = getString();
		if(message.equals("KILL")) System.exit(0);
		return deserializeMap(message);
	}

	public static void sendMove(Direction move) {
		System.out.print(move.ordinal()+"\n");
		System.out.flush();
	}
}