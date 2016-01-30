public class TronBot {
	public static void main(String[] args) {
		Tron tron = new Tron();
		while (true) {
			int[][] gameMap = tron.getMap();
			tron.sendMove(Tron.Direction.NORTH);
		}
	}
}