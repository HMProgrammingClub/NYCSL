import java.util.*;

public class TronBot {
	//We can't print to console, because that channel is used for IO with the environment.
	//We therefore create a PrintWriter and output to that. Use "OutputDebug" rather than "System.out.print".
	private static PrintWriter debug;
	private <T> void OutputDebug(T s) {
		debug.print(s);
		debug.flush();
	}
	
	public static void main(String[] args) {
		debug = new PrintWriter("debug-" + (System.currentTimeMillis() / 1000) + ".log"); //Cast to seconds.
		
		// Execute loop forever (or until game ends)
		while (true) {
			/* Get an integer map of the field. Each int
			 * can either be Tron.Tile.EMPTY, Tron.Tile.PLAYER1, 
			 * Tron.Tile.PLAYER2, Tron.Tile.TAKEN_BY_PLAYER1, or
			 * Tron.Tile.TAKEN_BY_PLAYER2.   */
			int[][] gameMap = Tron.getMap();

			/* Send your move.  This can be Tron.Direction.NORTH,
			 * Tron.Direction.SOUTH, Tron.Direction.EAST, or
			 * Tron.Direction.WEST.          */
			Tron.sendMove(Tron.Direction.NORTH);
		}
	}

}