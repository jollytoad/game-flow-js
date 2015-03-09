module GameFlow {

    export function identity<S>(state:S): S {
        return state;
    }

    export function ifElse<S>(predicate: (state:S) => boolean, onTrue: (state:S) => any, onFalse: (state:S) => any = identity): (state:S) => S {
        return (state:S) => predicate(state) ? onTrue(state) : onFalse(state);
    }
}
