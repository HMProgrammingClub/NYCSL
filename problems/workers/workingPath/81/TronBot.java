import java.util.*;
import java.io.*;

public class TronBot {
	public static HashMap<Integer, String> dirs = new HashMap<Integer, String>();
	public static void main(String[] args) {
		dirs.put(1, "Up");
		dirs.put(2, "Down");
		dirs.put(3, "Left");
		dirs.put(4, "Right");
		Random r = new Random();
		Tron.init();
		Tron.logln("Starting Game!");

		while (true) {
			ArrayList<ArrayList<Tron.Tile>> board = Tron.getMap();
			int[] myPos = TronUtils.myPos(board);
			logPos(myPos);
			boolean moveFound = false;
			for (int i = 1; i <= 4; i++) {
				if (direcFree(board, i)) {
					Tron.logln("Moving " + dirs.get(i));
          			go(i);
					moveFound = true;
          			break;
				}
			}
			if (!moveFound) go(r.nextInt(4) + 1);
		}
	}
	public static boolean direcFree(ArrayList<ArrayList<Tron.Tile>> board, int d) {
		int[] myPos = TronUtils.myPos(board);
		int[] desiredPos = new int[2];
		if (d == 1) { //up
			desiredPos[0] = myPos[0];
			desiredPos[1] = myPos[1] - 1;
		}
		else if (d == 2) { //down
			desiredPos[0] = myPos[0];
			desiredPos[1] = myPos[1] + 1;
		}
		else if (d == 3) { //left
			desiredPos[0] = myPos[0] + 1;
			desiredPos[1] = myPos[1];
		}
		else if (d == 4) { //right
			desiredPos[0] = myPos[0] - 1;
			desiredPos[1] = myPos[1];
		}
		return !TronUtils.offBoard(desiredPos) && TronUtils.isFree(board,desiredPos);
	}
	public static void go(int d) {
		if (d == 1) up();
		else if (d == 2) down();
		else if (d == 3) left();
		else if (d == 4) right();
	}
	public static void up() {
		Tron.sendMove(Tron.Direction.SOUTH);
	}
	public static void down() {
		Tron.sendMove(Tron.Direction.NORTH);
	}
	public static void left() {
		Tron.sendMove(Tron.Direction.EAST);
	}
	public static void right() {
		Tron.sendMove(Tron.Direction.WEST);
	}
	public static void logPos(int[] pos) {
		Tron.logln("Position: " + pos[0] + " " + pos[1]);
	}
}
