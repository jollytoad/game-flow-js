module GameFlow {

    export function chain(...fns:Array<(state:any) => any>): any {
        return fns.reduce.bind(fns, (state:any, fn:(s:any) => any) => fn(state));
    }

}
