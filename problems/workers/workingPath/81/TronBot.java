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
		int[] myPos = TronUtils.myPos(board);
		int dir1, dir2;
		if (myPos[0] == 0) {
			dir1 = 3;
			dir2 = 2;
		} else {
			dir1 = 4;
			dir2 = 1;
		}
		int steps = 0;

		while (true) {
			myPos = TronUtils.myPos(board);
			logPos(myPos);
			if (steps >= 27) {
				boolean moveFound = false;
				for (int i = 1; i <= 4; i++) {
					if (direcFree(board, i)) {
						if (myPos[1] + 1 >= 16) {
							if (direcFree(board, 1)) go (1);
							else if (direcFree(board, 4)) go (4);
							else if (direcFree(board, 3)) go (3);
							else suicide();
						} else {
							go (i);
						}
						moveFound = true;
						break;
					}
				}
				if (!moveFound) suicide();
			} else {
				boolean moveFound = false;
				if (steps % 2 == 0) {
					if (direcFree(board,dir1)) {
						go(dir1);
						moveFound = true;
					}
					else steps = 30;
				}
				else {
					if (direcFree(board,dir2)) {
						go(dir2);
						moveFound = true;
					}
					else steps = 30;
				}
				if (!moveFound) {
					boolean mf = false;
					for (int i = 1; i <= 4; i++) {
						if (direcFree(board, i)) {
							if (myPos[1] + 1 >= 16) {
								if (direcFree(board, 1)) go (1);
								else if (direcFree(board, 4)) go (4);
								else if (direcFree(board, 3)) go (3);
								else suicide();
							} else {
								go (i);
							}
							mf = true;
							break;
						}
					}
					if (!mf) suicide();
				}
			}
			steps++;
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
	public static void suicide() {
		go(new Random().nextInt(4) + 1);
	}
}
