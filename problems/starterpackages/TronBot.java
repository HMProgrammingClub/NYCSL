public class TronBot {
	public static void main(String[] args) {
		// Initialize the Tron library
		Tron tron = new Tron();

		// Execute loop forever (or until game ends)
		while (true) {
			/* Get an integer map of the field. Each int
			 * can either be Tron.Tile.EMPTY, Tron.Tile.PLAYER1, 
			 * Tron.Tile.PLAYER2, Tron.Tile.TAKEN_BY_PLAYER1, or
			 * Tron.Tile.TAKEN_BY_PLAYER2.   */
			int[][] gameMap = tron.getMap();

			/* Send your move.  This can be Tron.Direction.NORTH,
			 * Tron.Direction.SOUTH, Tron.Direction.EAST, or
			 * Tron.Direction.WEST.          */
			tron.sendMove(Tron.Direction.NORTH);
		}
	}

}