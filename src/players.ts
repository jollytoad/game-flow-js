module GameFlow {

    /**
     * A Player is a function that takes a cue and returns a function that takes a state and returns a new state.
     * It MUST be a pure, referentially transparent function. ie. uses only its arguments, takes no data from outside,
     * and has no side-effects. It must be entirely synchronous.
     */
    export interface Player<C,S> {
        (cue:C): (state:S) => S;
    }

    ///**
    // * Create a Player that chains a collection of Players
    // */
    //export function players<C,S>(players:Player<C,S>[]):Player<C,S> {
    //    return (cue:C): (state:S) => S => {
    //        // Call each player with the cue and state from the previous player
    //        return players.reduce.bind(undefined, (state, player) => player(cue)(state));
    //    };
    //}
}
