import java.util.*;
import java.io.*;

public class TronBot {    
    public static void main(String[] args) {
        //Initialize bot with respect to the Tron Environment.
        Tron.init();

        //We'll want to keep track of the turn number to make debugging easier.
        int turnNumber = 0;

        // Execute loop forever (or until game ends)
        while (true) {
            //Update turn number:
            turnNumber++;

            /* Get an integer map of the field. Each int
             * can either be Tron.Tile.EMPTY, Tron.Tile.PLAYER1, 
             * Tron.Tile.PLAYER2, Tron.Tile.TAKEN_BY_PLAYER1, or
             * Tron.Tile.TAKEN_BY_PLAYER2.   */
            int[][] m = Tron.getMap();

            int myLocX = 0, myLocY = 0;
            for(int y = 0; y < 16; y++)  {
                for(int x = 0; x < 16; x++) {
                    //I want to note that this is a little bit of a disgusting way of doing this comparison, and that you should change it later, but Java makes this uglier than C++
                    if(Tron.Tile.values()[m[y][x]] == Tron.Tile.PLAYER1) {
                        myLocX = x;
                        myLocY = y;
                    }
                }
            }

            boolean [] safe = new boolean[4]; //0 has value empty,
            safe[0] = myLocY != 15 && m[myLocY + 1][myLocX] == 0; //North
            safe[1] = myLocX != 15 && m[myLocY][myLocX + 1] == 0; //East
            safe[2] = myLocY != 0 && m[myLocY - 1][myLocX] == 0; //South
            safe[3] = myLocX != 0 && m[myLocY][myLocX - 1] == 0; //West

            Tron.log("-----------------------------------------------------\nDebug for turn #" + turnNumber + ":\n");
            for(int a = 0; a < 4; a++) Tron.log("Direction " +  stringFromDirection(a) + " is " + (safe[a] ? "safe.\n" : "not safe.\n"));

            /* Send your move.  This can be Tron.Direction.NORTH,
             * Tron.Direction.SOUTH, Tron.Direction.EAST, or
             * Tron.Direction.WEST.          */
            boolean sentMove = false;
            for(int a = 0; a < 4; a++) {
                if(safe[a]) {
                    sentMove = true;
                    Tron.sendMove(Tron.Direction.values()[a]);
                    break;
                }
            }
            if(!sentMove) Tron.sendMove(Tron.Direction.NORTH);
        }
    }

    public static String stringFromDirection(int dir) {
        return dir == 0 ? "NORTH" : dir == 1 ? "EAST" : dir == 2 ? "SOUTH" : dir == 3 ? "WEST" : "NONSENSE"; 
    }
}