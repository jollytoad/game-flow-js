module GameFlow {


    /**
     * Function to perform a shallow clone of an Array or Object, any other values are passed through untouched.
     */
    export interface Clone<T> {
        (orig: T): T
    }

    /**
     * Function to freeze an Array or Object making it immutable, should pass other values through silently.
     */
    export interface Freeze<T> {
        (orig: T, deep?: boolean): T
    }

    export interface CloneWithUpdatedProperty<T> {
        (orig: T, key: Key, value: any): T;
    }

    function isArrayOrObject(v: any) {
        return v != null && typeof v === 'object';
    }

    export function cloneSetFreeze(clone: Clone<any>, freeze: Freeze<any>, container: any, key: any, value: any): any {
        var cloned = clone(container);
        cloned[key] = freeze(value, true);
        return freeze(cloned);
    }

    export function immutableUpdate(cloneAndSet: CloneWithUpdatedProperty<any>, path: Array<any>, update: (orig: any) => any, state: any): any {
        if (!path || !path.length) throw new TypeError("immutableUpdate expects its path to be an Array of minimum length 1, got: " + path);

        function doUpdate(state: any, idx: number) {
            if (!isArrayOrObject(state)) throw new TypeError("immutableUpdate expects its state parameter to be an Object or an Array, at: " + path.slice(0,idx) + " got: " + state);

            var key = path[idx];
            var value:any = idx + 1 < path.length ? doUpdate(state[key], idx + 1) : update(state[key]);
            return value !== state[key] ? cloneAndSet(state, key, value) : state;
        }
        return doUpdate(state, 0);
    }

    export function freeze(v: any, deep: boolean = false): any {
        if (v != null && typeof v === 'object' && !Object.isFrozen(v)) {
            Object.freeze(v);
            if (deep) {
                if (Array.isArray(v)) {
                    (<any[]>v).forEach(item => freeze(item, true));
                } else {
                    for (var key in v) {
                        if (v.hasOwnProperty(key)) {
                            freeze(v[key], true);
                        }
                    }
                }
            }
        }
        return v;
    }
}
