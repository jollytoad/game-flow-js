/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/freeze.ts" />

describe("freeze", () => {

    var freeze = Utils.deepFreeze;

    it("makes all properties recursively readonly", () => {
        var state = freeze({
            "a": {
                "b": 1,
                "c": [1,2,3]
            }
        });

        state.a.b = null;
        state.a.c[1] = null;
        state.a = null;

        expect(state.a).not.toBeNull();
        expect(state.a.b).not.toBeNull();
        expect(state.a.c[1]).not.toBeNull();
    });

    it("makes all properties readonly with error in strict mode", () => {
        "use strict";

        var state = freeze({
            "a": {
                "b": 1
            }
        });

        expect(() => { state.a = null}).toThrowError();
    });

});
