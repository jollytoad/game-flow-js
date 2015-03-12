/// <reference path="locker.ts" />

module LoFlux {

    /**
     * A Player is a function that takes a cue and returns a function that takes a state and returns a new state.
     * It MUST be a pure, referentially transparent function. ie. uses only its arguments, takes no data from outside,
     * and has no side-effects. It must be entirely synchronous.
     */
    export interface Player<S> {
        (...cue:any[]): (state:S) => S;
    }

    /**
     * A Spectator takes the final state of a Round and executes any necessary side-effects.
     * eg. rendering to DOM, performing HTTP requests, or any other asynchronous action
     * It should never directly trigger a new Round.
     */
    export interface Spectator<S> {
        (newState:S, oldState?:S): void;
    }

    /**
     * The interface for triggering the next Round, given a cue.
     * This method will apply all Players to the state, and then execute all Spectators if the state has changed.
     */
    export interface Round {
        (...cue:any[]): void;
    }

    /**
     * Create a Round given a Locker (holding a State), Player and Spectator
     * This round can then be used as an Event handler function
     *
     * The args are ordered so that this fn could be curried with a common Locker and delegating Spectator,
     * then all that is needed is the Player(s) for each specific Event.
     */
    export function round<S>(locker:Locker<S>, spectator:Spectator<S>, player:Player<S>): Round {
        return (...cue:any[]):void => {

            // Get starting state
            var startState = locker.claim();

            try {
                // Call the player with the state from the board
                var endState = player.apply(undefined, cue)(startState);

                // Store state and determine if a change has occurred
                if (locker.swap(endState)) {

                    // Call spectator only if state has changed
                    spectator(endState, startState);
                }
            } finally {
                locker.release();
            }
        };
    }
}
