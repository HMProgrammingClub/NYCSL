import java.util.*;
public class TronUtils {
	public static final int width = 16, height = 16;
	private static int[] find(ArrayList<ArrayList<Tron.Tile>> board, int person) {
		Tron.Tile target = person == 0? Tron.Tile.ME : Tron.Tile.OPPONENT;
		for (int y = 0; y < board.size(); y++) {
			for (int x = 0; x < board.get(y).size(); x++) {
				if (board.get(y).get(x) == target) {
					return new int[]{x, y};
				}
			}
		}
		//person is off the board
		return new int[]{-1, -1};
	}
	public static int[] myPos(ArrayList<ArrayList<Tron.Tile>> board) {
		return find(board, 0);
	}
	public static int[] oppPos(ArrayList<ArrayList<Tron.Tile>> board) {
		return find(board, 1);
	}
	public static boolean isFree(ArrayList<ArrayList<Tron.Tile>> board, int[] pos) {
		return board.get(pos[1]).get(pos[0]) == Tron.Tile.EMPTY;
	}
	public static boolean offBoard(int[] pos) {
		return pos[0] >= width || pos[0] < 0 || pos[1] >= height || pos[1] < 0;
	}
}