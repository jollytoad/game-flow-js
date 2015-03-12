module Utils {

    /**
     * Chain several functions, passing the result from one into the next
     * @param fns
     */
    export function chain<S>(...fns:Array<(state:S) => S>): (state:S) => S {
        return fns.reduce.bind(fns, (state:S, fn:(s:S) => S) => fn(state));
    }

}
