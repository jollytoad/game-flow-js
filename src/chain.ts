module GameFlow {

    export function chain<S>(...fns:Array<(state:S) => S>): (state:S) => S {
        return fns.reduce.bind(fns, (state:S, fn:(s:S) => S) => fn(state));
    }

}
