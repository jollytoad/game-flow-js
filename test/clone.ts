/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/clone.ts" />

interface AnyObject {
    [idx: string]: any;
}

describe("clone", () => {
    var clone = GameFlow.clone;

    it("returns null from null", () => {
        expect(clone(null)).toBeNull();
    });

    it("returns same number from number", () => {
        expect(clone(10)).toBe(10);
    });

    it("returns same string from string", () => {
        expect(clone("this")).toBe("this");
    });

    it("returns cloned array from array", () => {
        var orig = [1, "two", 3];
        var cloned = clone(orig);
        expect(cloned).not.toBe(orig);
        expect(cloned).toEqual(orig);
    });

    it("returns cloned object from object", () => {
        var orig = {"1": 1, two: "two", that: "other"};
        var cloned = clone(orig);
        expect(cloned).not.toBe(orig);
        expect(cloned).toEqual(orig);
    });

    it("returns cloned Date from Date", () => {
        var orig = new Date();
        var cloned = clone(orig);
        expect(cloned).not.toBe(orig);
        expect(cloned).toEqual(orig);
    });

    it("returns cloned complex object", () => {
        var orig: AnyObject = {"1": 1, two: "two", anArray: [ null, 1, "one" ], aNull: null, nowt: undefined, anObject: { "this": "other" }};
        var cloned = clone(orig);
        expect(cloned).not.toBe(orig);
        expect(cloned).toEqual(orig);
    });

    it("is shallow", () => {
        var inner: AnyObject = { "this": "other" };
        var orig: AnyObject = { "inner": inner };
        var cloned = clone(orig);
        expect(cloned).not.toBe(orig);
        expect(cloned.inner).toBe(inner);
    });

});
