module Utils {

    /**
     * Create a function that calls all the given functions in order
     */
    export function delegate<F extends Function>(fns:F[]): F {
        return <any>function(...args:any[]): void {
            fns.forEach(fn => {
                fn.apply(undefined, args);

                // TODO: Convert to spread when TS supports it:
                // fn(...args);
            });
        };
    }
}
