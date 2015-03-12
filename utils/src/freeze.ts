module Utils {

    /**
     * Recursively freeze an object/array making it immutable
     * @param v The value to freeze
     * @returns {any}
     */
    export function deepFreeze(v: any): any {
        if (v != null && typeof v === 'object' && !Object.isFrozen(v)) {
            Object.freeze(v);
            if (Array.isArray(v)) {
                (<any[]>v).forEach(item => deepFreeze(item));
            } else {
                for (var key in v) {
                    if (v.hasOwnProperty(key)) {
                        deepFreeze(v[key]);
                    }
                }
            }
        }
        return v;
    }
}
