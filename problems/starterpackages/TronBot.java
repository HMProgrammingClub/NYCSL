public class TronBot {
	/* 
		Example Bot for NYCSL.io February 2016: Tron
	*/

	public static void main(String[] args) {
		// Initialize the Tron libary
		Tron tron = new Tron();

		// Execute loop forever (or until game ends)
		while (true) {
			// Get an integer map of 
			int[][] gameMap = tron.getMap();
			tron.sendMove(Tron.Direction.NORTH);
		}
	}

}