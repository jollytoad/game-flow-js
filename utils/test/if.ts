/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/if.ts" />

describe("ifElse", () => {

    var ifElse = Utils.ifElse;

    it("applies 1st fn if predicate returns true", () => {
        expect(ifElse<any>((s) => true, (s) => "first", (s) => "second")(null)).toBe("first");
    });

    it("applies 2nd fn if predicate returns false", () => {
        expect(ifElse<any>((s) => false, (s) => "first", (s) => "second")(null)).toBe("second");
    });

});
