module GameFlow {

    /**
     * A Player is a function that takes a cue and returns a function that takes a state and returns a new state.
     * It MUST be a pure, referentially transparent function. ie. uses only its arguments, takes no data from outside,
     * and has no side-effects. It must be entirely synchronous.
     */
    export interface Player<S> {
        (...cue:any[]): (state:S) => S;
    }
}
