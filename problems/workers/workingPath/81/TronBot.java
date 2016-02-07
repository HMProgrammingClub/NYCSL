//CUTTING OFF NEXT-BEST MOVE STRATEGY, with Greedy after cut attempt
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
		ArrayList<ArrayList<Tron.Tile>> board = Tron.getMap();
		int sideSteps = 0;
		int[] myPos = TronUtils.myPos(board);
		int sideStepDir = myPos[0] == 0? 4 : 3;

		while (true) {
			Tron.logln("Here");
			myPos = TronUtils.myPos(board);
			logPos(myPos);
			if (sideSteps < 14) {
				go(sideStepDir);
				sideSteps++;
			} else {
				//move to greedy strategy
				boolean moveFound = false;
				for (int i = 1; i <= 4; i++) {
					if (direcFree(board, i)) {
						go(i);
						moveFound = true;
						break;
					}
				}
				if (!moveFound) suicide();
			}
			board = Tron.getMap();
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
		else if (d == 4) { //left
			desiredPos[0] = myPos[0] + 1;
			desiredPos[1] = myPos[1];
		}
		else if (d == 3) { //right
			desiredPos[0] = myPos[0] - 1;
			desiredPos[1] = myPos[1];
		}
		return !TronUtils.offBoard(desiredPos) && TronUtils.isFree(board,desiredPos);
	}
	public static void go(int d) {
		if (d == 1) up();
		else if (d == 2) down();
		else if (d == 4) left();
		else if (d == 3) right();
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
	public static void suicide() {
		go(new Random().nextInt(4) + 1);
	}
}
