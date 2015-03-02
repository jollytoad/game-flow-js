module GameFlow {

    /**
     * Interface for storing and retrieving application state between event loops.
     *
     * The state is fetched via a claim, state can then be manipulated and returned back to the board via swap, which
     * will compare the new state against the old and return a boolean indicating if a change has occurred.
     * Then any side-effects can be invoked with the new state if it has changed, and finally a release.
     *
     * Between a claim and release another claim cannot be made - a error is thrown if so.
     */
    export interface Board<S> {
        /**
         * Claim the latest state
         * @return the state
         * @throws if another claim is attempt before a release
         */
        claim(): S;

        /**
         * Store the state
         * @param state
         * @return true if the state has changed
         * @throws if the state has not been claimed
         */
        swap(state:S): boolean;

        /**
         * Release the claim on the state
         * @throws if the state has not been claimed
         */
        release(): void;
    }

    /**
     * Create a Board, given an initial State
     */
    export function board<S>(initialState:S):Board<S> {
        var state = initialState;
        var claimed = false;

        return {
            claim() {
                if (claimed) {
                    throw "Attempted to claim a state twice";
                }
                claimed = true;
                return state;
            },

            swap(newState) {
                if (!claimed) {
                    throw "Attempted to swap an unclaimed state";
                }
                if (newState !== state) {
                    state = newState;
                    return true;
                }
                return false;
            },

            release() {
                if (!claimed) {
                    throw "Attempted to release an unclaimed state";
                }
                claimed = false;
            }
        };
    }
}