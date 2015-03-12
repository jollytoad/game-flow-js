module Utils {

    export function equals(a: any, b: any): boolean {
        if (a === b) return true;
        if (typeof a !== typeof b) return false;

        if (typeof a === 'object') {
            if (Array.isArray(a)) {
                if (!Array.isArray(b) || a.length !== b.length) return false;
                for (var i = 0; i < a.length; i++) {
                    if (!equals(a[i], b[i])) return false;
                }
                return true;
            } else if (a instanceof Date) {
                if (!(b instanceof Date)) return false;
                return a.getTime() === b.getTime();
            } else {
                var aKeys = Object.keys(a).sort();
                var bKeys = Object.keys(b).sort();
                if (!equals(aKeys, bKeys)) return false;
                for (var j = 0; j < aKeys.length; j++) {
                    if (!equals(a[aKeys[j]], b[bKeys[j]])) return false;
                }
                return true;
            }
        }

        return false;
    }

}
