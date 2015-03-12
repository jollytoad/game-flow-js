/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/chain.ts" />

describe("chain", () => {

    var chain = Utils.chain;
    var state: any;

    beforeEach(() => {
        state = "one";
    });

    it("passes initial state into first fn", () => {
        var fn1 = jasmine.createSpy("fn1", (state:any) => state).and.callThrough();

        var fn = chain(fn1);

        expect(fn(state)).toBe(state);
        expect(fn1).toHaveBeenCalledWith(state);
    });

    it("passes result of first fn into next fn", () => {
        var fn1 = jasmine.createSpy("fn1", (state:any) => "two").and.callThrough();
        var fn2 = jasmine.createSpy("fn2", (state:any) => "three").and.callThrough();

        var fn = chain(fn1, fn2);

        expect(fn(state)).toBe("three");
        expect(fn2).toHaveBeenCalledWith("two");
    });
});
