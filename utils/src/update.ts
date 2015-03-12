module Utils {

    function isArrayOrObject(v: any) {
        return v != null && typeof v === 'object';
    }

    /**
     * Clones an object/array, sets a property or element, and deep freezes the cloned value
     *
     * @param clone A fn to perform a shallow clone of an object/array, other values are simply passed through
     * @param freeze A fn to deep freeze (recursively) an object/array making it immutable, should pass other values through silently
     * @param container The object/array to clone
     * @param key The property key of the container object, or index of the array
     * @param value The new value of the property/index (undefined will delete it)
     */
    export function cloneSetFreeze<S>(clone: (orig: S) => S, freeze: (orig: S) => S, container: S, key: any, value: any): S {
        var cloned:any = clone(container);
        if (value === undefined) {
            delete cloned[key];
        } else {
            cloned[key] = value;
        }
        return freeze(cloned);
    }

    /**
     * Update a nested value in an object/array, given a path to the value, and a function that takes the old value and returns a new
     *
     * @param cloneAndSet A fn that returns a clone of the array/object with a replaced property/element (a partially applied cloneSetFreeze is ideal for this)
     * @param path The path of property keys and/or indices to the value
     * @param getValue A fn that returns the new value given the old value
     * @param container The root object/array
     */
    export function update<S>(cloneAndSet: <T>(orig: T, key: Key, value: any) => T, path: string|Array<any>, getValue: (orig: any) => any, container: S): S {
        if (typeof path === 'string') path = (<string>path).split('.');
        if (!path || !path.length) throw new TypeError("update expects its path to be a String or Array of minimum length 1, got: " + path);

        function doUpdate(container: any, idx: number) {
            if (!isArrayOrObject(container)) throw new TypeError("update expects its container parameter to be an Object or an Array, at: " + path.slice(0,idx) + " got: " + container);

            var key = path[idx];
            var value:any = idx + 1 < path.length ? doUpdate(container[key], idx + 1) : getValue(container[key]);
            return value !== container[key] ? cloneAndSet(container, key, value) : container;
        }
        return doUpdate(container, 0);
    }
}
