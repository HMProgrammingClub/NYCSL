import java.util.*;
import java.io.*;

public class TronBot {
    public static void main(String[] args) {
        // Call this to initialize networking and the debug file
        Tron.init();
        
        // We can't print to console, because that channel is used for IO with the environment.
        // We therefore print to either debug1.log or debug2.log. The first is for player1, the second for layer two
        // Use log() rather than print.
        Tron.log("This is a Java bot.");

        // Execute loop forever (or until game ends)
        while (true) {
            /* Get an integer map of the field. Each int
             * can either be Tron.Tile.EMPTY, Tron.Tile.ME, 
             * Tron.Tile.OPPONENT, Tron.Tile.TAKEN_BY_ME, or
             * Tron.Tile.TAKEN_BY_OPPONENT.   
             *
             * The origin (0,0) is at the bottom left corner,
             * and the tile at a position can be found using gameMap.get(y).get(x).
             */
            ArrayList<ArrayList<Tron.Tile>> gameMap = Tron.getMap();

            /* Let's find our current position and store it.
             * We'll loop through the map, and save the X and Y coordinates
             * when the tile is equal to your position (Tron.Tile.ME).
             */
            int myX = 0; // create variables to store your position
            int myY = 0;
            for(int y = 0; y < gameMap.size(); y++) {
                for(int x = 0; x < gameMap.size(); x++) {
                    if(gameMap.get(y).get(x) == Tron.Tile.ME) {
                        myX = x;
                        myY = y;
                    }
                }
            }


            /* STRATEGY OVERVIEW:
             * Have a priority list of North, East, South, West.
             * Follow the priority list, but first check if a
             * move will kill you before executing it.
             */

            // Check if North is out of bounds, and whether the title is empty.           
            if (myY+1 < 16 && gameMap.get(myY+1).get(myX) == Tron.Tile.EMPTY) { 
                Tron.sendMove(Tron.Direction.NORTH); // move north
                Tron.logln("Moved north."); // log the move to the log file
            }
            
            // Do the same for East then South, with West as the fallback.
            else if (myX+1 < 16 && gameMap.get(myY).get(myX+1) == Tron.Tile.EMPTY) {
                Tron.sendMove(Tron.Direction.EAST);
                Tron.logln("Moved east.");
            } 
            
            else if (myY-1 >= 0 &&gameMap.get(myY-1).get(myX) == Tron.Tile.EMPTY) {
                Tron.sendMove(Tron.Direction.SOUTH);
                Tron.logln("Moved south.");
            }
            
            else { // If all else fails, just move west.
                Tron.sendMove(Tron.Direction.WEST);
                Tron.logln("Moved west.");
            }
        }
    }
}