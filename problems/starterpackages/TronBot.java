import java.util.*;
import java.io.*;

public class TronBot {
	public static void main(String[] args) {
		// Call this to initialize networking and the debug file
		Tron.init();

		// We can't print to console, because that channel is used for IO with the environment.
		// We therefore print to either debug1.log or debug2.log. The first is for player1, the second for layer two
		// Use log() rather than print.
		Tron.log("This is a java bot");

		// Execute loop forever (or until game ends)
		while (true) {
			/* Get an integer map of the field. Each int
			 * can either be Tron.Tile.EMPTY, Tron.Tile.ME, 
			 * Tron.Tile.OPPONENT, Tron.Tile.TAKEN_BY_ME, or
			 * Tron.Tile.TAKEN_BY_OPPONENT.   */
			ArrayList<ArrayList<Tron.Tile>> gameMap = Tron.getMap();

			// Let's find our current position and log it
			for(int y = 0; y < gameMap.size(); y++) {
				for(int x = 0; x < gameMap.size(); x++) {
					if(gameMap.get(y).get(x) == Tron.Tile.ME) {
						Tron.log("position: " + x + ", " + y);
					}
				}
			}

			/* Send your move.  This can be Tron.Direction.NORTH,
			 * Tron.Direction.SOUTH, Tron.Direction.EAST, or
			 * Tron.Direction.WEST.          */
			Tron.sendMove(Tron.Direction.SOUTH);
		}
	}

}