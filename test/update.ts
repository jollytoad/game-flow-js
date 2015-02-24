/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/clone.ts" />
/// <reference path="../src/update.ts" />

describe("immutableUpdate", () => {

    var clone = GameFlow.clone;
    var freeze = Object.freeze;
    var cloneAndSet = GameFlow.cloneSetFreeze.bind(undefined, clone, freeze);
    var update = GameFlow.immutableUpdate.bind(undefined, cloneAndSet);
    var just = (v: any) => () => v;

    var state: any;

    beforeEach(() => {
        state = {
            "key1": "one",
            "key2": "two",
            "keyObject": {
                "keyA": "here",
                "keyB": "there"
            },
            "keyArray": [
                "A",
                "B",
                "C",
                {
                    "deepKey": "ok"
                }
            ]
        };
    });

    it("sets 1st level property and clones state given in single segment path", () => {
        var newState = update(["key1"], state, just("changed"));
        expect(newState).not.toBe(state);
        expect(newState.key1).toBe("changed");
        expect(newState.keyObject).toBe(state.keyObject);
        expect(newState.keyArray).toBe(state.keyArray);
    });

    it("sets 2nd level property and clones ancestors given in two segment path", () => {
        var newState = update(["keyObject", "keyB"], state, just("changed"));
        expect(newState).not.toBe(state);
        expect(newState.keyObject).not.toBe(state.keyObject);
        expect(newState.keyObject.keyA).toBe(state.keyObject.keyA);
        expect(newState.keyObject.keyB).toBe("changed");
    });

    it("sets deep property and clones ancestors", () => {
        var newState = update(["keyArray", 3, "deepKey"], state, just("changed"));
        expect(newState).not.toBe(state);
        expect(newState.keyObject).toBe(state.keyObject);
        expect(newState.keyArray).not.toBe(state.keyArray);
        expect(newState.keyArray[0]).toBe(state.keyArray[0]);
        expect(newState.keyArray[3]).not.toBe(state.keyArray[3]);
        expect(newState.keyArray[3].deepKey).toBe("changed");
    });
});
