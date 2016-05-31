/*
Sample Wall Hugging Bot in Java
*/
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
             * can either be Tron.Tile.EMPTY, Tron.Tile.ME,
             * Tron.Tile.OPPONENT, Tron.Tile.TAKEN_BY_ME,
             * Tron.Tile.TAKEN_BY_OPPONENT, or Tron.Tile.WALL */
            ArrayList<ArrayList<Tron.Tile>> mList = Tron.getMap();
            int[][] m = new int[mList.size()][mList.get(0).size()];
            for (int i = 0; i < mList.size(); i++) {
                for (int j = 0; j < mList.get(i).size(); j++) {
                    m[i][j] = mList.get(i).get(j).ordinal();
                }
            }

            //Let's figure out where we are:
            int myLocX = 0, myLocY = 0;
            for(int y = 0; y < 16; y++)  {
                for(int x = 0; x < 16; x++) {
                    //I want to note that this is a little bit of a disgusting way of doing this comparison, and that you should change it later, but Java makes this uglier than C++
                    if(Tron.Tile.values()[m[y][x]] == Tron.Tile.ME) {
                        myLocX = x;
                        myLocY = y;
                    }
                }
            }

            //Let's find out which directions are safe to go in:
            boolean [] safe = emptyAdjacentSquares(m, myLocX, myLocY);

            //Let's look at the counts of empty squares around the possible squares to go to:
            int [] dirEmptyCount = new int[4];
            for(int a = 0; a < 4; a++) {
                if(safe[a]) {
                    //Get the location we would be in if we went in a certain direction (specified by a).
                    int[] possibleSquare = getLocation(myLocX, myLocY, a);
                    //Make sure that square exists:
                    if(possibleSquare[0] != -1 && possibleSquare[1] != -1) {
                        //Find the squares around that square:
                        boolean [] around = emptyAdjacentSquares(m, possibleSquare[0], possibleSquare[1]);
                        //Count the number of empty squares around that square and set it in our array:
                        dirEmptyCount[a] = 0;
                        for(int b = 0; b < 4; b++) if(around[b]) dirEmptyCount[a]++;
                    }
                }
                else dirEmptyCount[a] = 5; //Irrelevant, but we must ensure it's as large as possible because we don't want to go there.
            }

            //Log some basic information.
            Tron.log("-----------------------------------------------------\nDebug for turn #" + turnNumber + ":\n");
            for(int a = 0; a < 4; a++) Tron.log("Direction " +  stringFromDirection(a) + " is " + (safe[a] ? "safe.\n" : "not safe.\n"));

            /* Send your move.  This can be Tron.Direction.NORTH,
             * Tron.Direction.SOUTH, Tron.Direction.EAST, or
             * Tron.Direction.WEST.          */
            int minVal = 1000, minValLoc = 0;
            for(int a = 0; a < 4; a++) {
                if(dirEmptyCount[a] < minVal) {
                    minVal = dirEmptyCount[a];
                    minValLoc = a;
                }
            }
            Tron.sendMove(Tron.Direction.values()[minValLoc]);
        }
    }

    //Little useful function for debugging, as it will tell us what direction, in words, an integer corresponds to.
    public static String stringFromDirection(int dir) {
        return dir == 0 ? "NORTH" : dir == 1 ? "EAST" : dir == 2 ? "SOUTH" : dir == 3 ? "WEST" : "NONSENSE";
    }

    /*This function finds out which squares adjacent to location are empty.
    It returns in the standard order of NORTH, EAST, SOUTH, and WEST as booleans which are true if the square is empty.
    Note that this function DOES create dynamic memory. Make sure to delete it when you're done.*/
    public static boolean [] emptyAdjacentSquares(int [][] map, int locX, int locY) {
        boolean [] empty = new boolean[4]; //0 has value empty.
        empty[0] = locY != 15 && map[locY + 1][locX] == 0; //North
        empty[1] = locX != 15 && map[locY][locX + 1] == 0; //East
        empty[2] = locY != 0 && map[locY - 1][locX] == 0; //South
        empty[3] = locX != 0 && map[locY][locX - 1] == 0; //West
        return empty;
    }

    //This will give us the square we'd get to if we tried to move in direction dir from location.
    public static int[] getLocation(int locX, int locY, int dir) {
        if(dir == 0) return locY == 15 ? new int[]{ -1, -1 } : new int[]{ locX, locY + 1 };
        if(dir == 1) return locX == 15 ? new int[]{ -1, -1 } : new int[]{ locX + 1, locY };
        if(dir == 2) return locY == 0 ? new int[]{ -1, -1 } : new int[]{ locX, locY - 1 };
        if(dir == 3) return locX == 0 ? new int[]{ -1, -1 } : new int[]{ locX - 1, locY };
        //I hate Java exceptions, so fuck it. Don't give this function anything but 0, 1, 2, or 3.
        return new int[]{ -1, -1 };
    }
}
