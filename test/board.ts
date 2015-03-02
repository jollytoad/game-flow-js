/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/board.ts" />

describe("Board", () => {
    var state: any;
    var board: GameFlow.Board<typeof state>;

    beforeEach(() => {
        state = { stuff: "here" };
        board = GameFlow.board(state);
    });

    it("returns the state on first claim", () => {
        expect(board.claim()).toBe(state);
    });

    it("throws on subsequent claim", () => {
        board.claim();

        expect(() => board.claim()).toThrow();
    });

    it("throws on swap without a claim", () => {
        expect(() => board.swap({ stuff: "there" })).toThrow();
    });

    it("throws on release without a claim", () => {
        expect(() => board.release()).toThrow();
    });

    it("allows a claim after a claim and release", () => {
        board.claim();
        board.release();

        expect(board.claim()).toBe(state);
    });

    it("returns the new state after a claim, swap, release", () => {
        var newState: typeof state = { different: "there" };

        board.claim();
        board.swap(newState);
        board.release();

        expect(board.claim()).toBe(newState);
    });

    it("returns true on swap of a new state", () => {
        var newState: typeof state = { different: "there" };

        board.claim();

        expect(board.swap(newState)).toBe(true);
    });

    it("returns false on swap of the same state", () => {
        var oldState: typeof state = board.claim();

        expect(board.swap(oldState)).toBe(false);
    });

});
