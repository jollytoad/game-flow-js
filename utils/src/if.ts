module Utils {

    export function identity<S>(state:S): S {
        return state;
    }

    /**
     * Call the given true or false function on the outcome of the predicate function.
     * @param predicate
     * @param onTrue
     * @param onFalse
     * @returns {function(S): any}
     */
    export function ifElse<S>(predicate: (state:S) => boolean, onTrue: (state:S) => any, onFalse: (state:S) => any = identity): (state:S) => S {
        return (state:S) => predicate(state) ? onTrue(state) : onFalse(state);
    }
}
