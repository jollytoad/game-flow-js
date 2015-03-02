/// <reference path="board.ts" />
/// <reference path="players.ts" />
/// <reference path="spectators.ts" />

module GameFlow {

    /**
     * The interface for triggering the next Round, given a cue.
     * This method will apply all Players to the state, and then execute all Spectators if the state has changed.
     */
    export interface Round<C> {
        (cue:C): void;
    }

    /**
     * Create a Round given a Board (holding a State), Player and Spectator
     * This round can then be used as an Event handler function
     *
     * The args are ordered so that this fn could be partially applied with a common Board and delegating Spectator,
     * then all that is needed is the Player(s) for each specific Event.
     */
    export function round<C,S>(board:Board<S>, spectator:Spectator<S>, player:Player<C,S>):Round<C> {
        return (cue:C):void => {

            // Get starting state
            var startState = board.claim();

            try {
                // Call the player with the state from the board
                var endState = player(cue, startState);

                // Store state and determine if a change has occurred
                if (board.swap(endState)) {

                    // Call spectator only if state has changed
                    spectator(endState, startState);
                }
            } finally {
                board.release();
            }
        };
    }
}
