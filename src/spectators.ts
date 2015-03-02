module GameFlow {

    /**
     * An Spectator takes the final state of a Round and executes any necessary side-effects.
     * eg. rendering to DOM, performing HTTP requests, or any other asynchronous action
     * It should never directly trigger a new Round.
     */
    export interface Spectator<S> {
        (newState:S, oldState?:S): void;
    }

    /**
     * Create a delegating Spectator for a collection of Spectators
     */
    export function spectators<S>(spectators:Spectator<S>[]):Spectator<S> {
        return function (newState:S, oldState:S):void {
            // Call each spectators with the state
            spectators.forEach(spectator => {
                spectator(newState, oldState);
            });
        };
    }
}
