import java.util.*;

public class Tron {
	Scanner key;

	public static enum Direction {
		NORTH, EAST, SOUTH, WEST
	}

	public static enum Tile {
		EMPTY, PLAYER1, PLAYER2, 
		TAKEN_BY_PLAYER1, TAKEN_BY_PLAYER2
	}

	public Tron() {
		key = new Scanner(System.in);
	}

	private int[][] deserializeMap(String mapString) {
		String[] tiles = mapString.split("\\s+");
		int[] tileVals = new int[tiles.length];
		for (int i=0; i<tiles.length; i++) tileVals[i] = Integer.parseInt(tiles[i].trim());

		int[][] map = new int[16][16];
		for (int i=0; i<16; i++) map[i] = Arrays.copyOfRange(tileVals,i*16,(i+1)*16);
		return map;
	}

	private String getString() {
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

	public int[][] getMap() {
		return deserializeMap(getString());
	}

	public void sendMove(Direction move) {
		System.out.print(move.ordinal()+"\n");
		System.out.flush();
	}
}