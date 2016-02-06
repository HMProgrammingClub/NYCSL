import java.util.*;
import java.io.*;

public class TronBot {
	public static void main(String[] args) {
		// Call this to initialize networking and the debug file
		Tron.init();

		// Execute loop forever (or until game ends)
		while (true) {
			/* Get an integer map of the field. Each int
			 * can either be Tron.Tile.EMPTY, Tron.Tile.ME, 
			 * Tron.Tile.OPPONENT, Tron.Tile.TAKEN_BY_ME, or
			 * Tron.Tile.TAKEN_BY_OPPONENT.   */
			ArrayList<ArrayList<Tile>> gameMap = Tron.getMap();

			Tron.log("java test");

			/* Send your move.  This can be Tron.Direction.NORTH,
			 * Tron.Direction.SOUTH, Tron.Direction.EAST, or
			 * Tron.Direction.WEST.          */
			Tron.sendMove(Tron.Direction.SOUTH);
		}
	}

}