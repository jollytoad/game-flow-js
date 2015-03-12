/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/equals.ts" />

interface AnyObject {
    [idx: string]: any;
}

describe("equals", () => {
    var equals = Utils.equals;

    it("is true for (null, null)", () => {
        expect(equals(null,null)).toBe(true);
    });

    it("is true for (undefined, undefined)", () => {
        expect(equals(undefined, undefined)).toBe(true);
    });

    it("is true for boolean falses", () => {
        expect(equals(false, false)).toBe(true);
    });

    it("is true for boolean trues", () => {
        expect(equals(true, true)).toBe(true);
    });

    it("is false for boolean true and false", () => {
        expect(equals(true, false)).toBe(false);
    });

    it("is true for identical strings", () => {
        expect(equals("this", "this")).toBe(true);
    });

    it("is false for differing strings", () => {
        expect(equals("this", "other")).toBe(false);
    });

    it("is true for identical Dates", () => {
        expect(equals(new Date(1424619039666), new Date(1424619039666))).toBe(true);
    });

    it("is false for differing Dates", () => {
        expect(equals(new Date(1424619039666), new Date(1424619039667))).toBe(false);
    });

    // Arrays

    it("is true for empty arrays", () => {
        expect(equals([], [])).toBe(true);
    });

    it("is true for same array", () => {
        var arr = [ 1, "two", 3 ];
        expect(equals(arr, arr)).toBe(true);
    });

    it("is true for arrays with same content", () => {
        expect(equals([ 1, "two", 3], [ 1, "two", 3 ])).toBe(true);
    });

    it("is false for arrays with differing content", () => {
        expect(equals([ 1, "two", 3], [ 1, "two", 2 ])).toBe(false);
    });

    // Objects

    it("is true for empty objects", () => {
        expect(equals({}, {})).toBe(true);
    });

    it("is true for same object", () => {
        var obj = { "one": 1 };
        expect(equals(obj, obj)).toBe(true);
    });

    it("is true for objects with same keys and values", () => {
        expect(equals({ "one": 1, "two": 2, "three": "3" }, { "three": "3", "one": 1, "two": 2 })).toBe(true);
    });

    it("is false for objects with same keys but different values", () => {
        expect(equals({ "one": 1, "two": 2, "three": "3" }, { "three": 3, "one": "1", "two": 2 })).toBe(false);
    });

    it("is false for objects with different keys", () => {
        expect(equals({ "one": 1 }, { "two": 2 })).toBe(false);
    });

    it("is true for equivalent complex objects", () => {
        var a: AnyObject = {nowt: undefined, "1": 1, anArray: [ null, 1, "one" ], aNull: null, two: "two" , anObject: { "this": "other" }};
        var b: AnyObject = {"1": 1, two: "two", anArray: [ null, 1, "one" ], aNull: null, nowt: undefined, anObject: { "this": "other" }};
        expect(equals(a,b)).toBe(true);
    });

});
