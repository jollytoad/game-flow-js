module GameFlow {

    function cloneArray(val: Array<any>): any {
        return val.slice(0);
    }

    function cloneObject(val: any): any {
        var cloned:any = {};
        Object.keys(val).forEach((key:string) => {
            cloned[key] = val[key];
        });
        return cloned;
    }

    function cloneDate(val: Date): any {
        return new Date(val.getTime());
    }

    export function clone<T>(val: T): T {
        if (typeof val === 'object' && val !== null) {
            if (Array.isArray(val)) {
                return cloneArray(<any> val);
            } else if (val instanceof Date) {
                return cloneDate(<any> val);
            } else {
                return cloneObject(<any> val);
            }
        } else {
            return val;
        }
    }

}
