/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/locker.ts" />

describe("Locker", () => {
    var state: any;
    var locker: LoFlux.Locker<typeof state>;

    beforeEach(() => {
        state = { stuff: "here" };
        locker = LoFlux.createLocker(state);
    });

    it("returns the state on first claim", () => {
        expect(locker.claim()).toBe(state);
    });

    it("throws on subsequent claim", () => {
        locker.claim();

        expect(() => locker.claim()).toThrow();
    });

    it("throws on swap without a claim", () => {
        expect(() => locker.swap({ stuff: "there" })).toThrow();
    });

    it("throws on release without a claim", () => {
        expect(() => locker.release()).toThrow();
    });

    it("allows a claim after a claim and release", () => {
        locker.claim();
        locker.release();

        expect(locker.claim()).toBe(state);
    });

    it("returns the new state after a claim, swap, release", () => {
        var newState: typeof state = { different: "there" };

        locker.claim();
        locker.swap(newState);
        locker.release();

        expect(locker.claim()).toBe(newState);
    });

    it("returns true on swap of a new state", () => {
        var newState: typeof state = { different: "there" };

        locker.claim();

        expect(locker.swap(newState)).toBe(true);
    });

    it("returns false on swap of the same state", () => {
        var oldState: typeof state = locker.claim();

        expect(locker.swap(oldState)).toBe(false);
    });

});
