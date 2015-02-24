module GameFlow {

    interface AnyObject {
        [idx: string]: any;
    }

    export function cloneSetFreeze(clone: (orig: any) => any, freeze: (orig: any) => any, container: AnyObject, key: string, value: any): any {
        var cloned = clone(container);
        cloned[key] = value;
        return freeze(cloned);
    }

    export function immutableUpdate(cloneAndSet: (orig: any, key: string, value: any) => any, path: string[], state: any, update: (orig: any) => any, idx: number = 0): any {
        var key = path[idx];
        var value = idx+1 < path.length ? immutableUpdate(cloneAndSet, path, state[key], update, idx+1) : update(state[key]);
        return value !== state[key] ? cloneAndSet(state, key, value) : state;
    }
}
