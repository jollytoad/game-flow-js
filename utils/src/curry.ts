module Utils {

    /**
     * Create a curried function
     * @param fn The function to curry
     * @param arity The number of arguments that function takes if it cannot be determined from length property of the function
     */
    export function curry(fn:Function, arity: number = fn.length):Function {
        return (...args:any[]) => {
            if (args.length >= arity) {
                return fn.apply(undefined, args);
            }
            return curry(fn.bind.apply(fn, [undefined].concat(args)));
        };
    }

}