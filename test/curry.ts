/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/curry.ts" />

describe("curry", () => {
    var curry = GameFlow.curry;

    var abc = curry((a:string, b:string, c: string) => a + b + c);

    it("(a,b,c)", () => {
        expect(abc("a","b","c")).toBe("abc");
    });

    it("(a,b)(c)", () => {
        expect(abc("a","b")("c")).toBe("abc");
    });

    it("(a)(b,c)", () => {
        expect(abc("a")("b", "c")).toBe("abc");
    });

    it("(a)(b)(c)", () => {
        expect(abc("a")("b")("c")).toBe("abc");
    });

});