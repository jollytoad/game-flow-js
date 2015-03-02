module GameFlow {

    export function curry(fn:Function, arity: number = fn.length):Function {
        return (...args:any[]) => {
            if (args.length >= arity) {
                return fn.apply(undefined, args);
            }
            return curry(fn.bind.apply(fn, [undefined].concat(args)));
        };
    }

}