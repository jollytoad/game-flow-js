/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/round.ts" />

describe("Round", () => {
    var state: any;
    var cue: any;
    var board: GameFlow.Board<typeof state>;
    var noop: GameFlow.Spectator<typeof state> = () => {};

    beforeEach(function () {
        state = { stuff: "here" };
        board = GameFlow.board(state);

        cue = { type: "doit" };
    });

    it("passes cue to player", () => {
        var player:GameFlow.Player<typeof cue, typeof state> = jasmine.createSpy("player", () => (s: typeof state) => s).and.callThrough();

        var round = GameFlow.round(board, noop, player);

        round(cue);

        expect(player).toHaveBeenCalledWith(cue);
    });

    it("passes state to function returned by player", () => {
        var modifier: (s: typeof state) => typeof state = jasmine.createSpy("modifier", (s: typeof state) => s).and.callThrough();
        var player: GameFlow.Player<typeof cue, typeof state> = (cue) => modifier;

        var round = GameFlow.round(board, noop, player);

        round(cue);

        expect(modifier).toHaveBeenCalledWith(state);
    });

    it("swaps state with the return from player", () => {
        var newState: typeof state = { something: "else"};

        var round = GameFlow.round(board, noop, () => () => newState);

        round(cue);

        expect(board.claim()).toBe(newState);
    });

    it("invokes spectator with new and old state", () => {
        var newState: typeof state = { something: "else"};
        var spectator = jasmine.createSpy("spectator");

        var round = GameFlow.round(board, spectator, () => () => newState);

        round(cue);

        expect(spectator).toHaveBeenCalledWith(newState, state);
    });

    it("does not invoke spectator if state is same", () => {
        var spectator = jasmine.createSpy("spectator");

        var round = GameFlow.round(board, spectator, (cueArg) => (stateArg) => stateArg);

        round(cue);

        expect(spectator).not.toHaveBeenCalled();
    });

    it("throws if round called inside player", () => {
        var round = GameFlow.round(board, noop, () => () => { round(cue); });

        expect(() => round(cue)).toThrow();
    });

    it("throws if round called inside spectator", () => {
        var newState: typeof state = { something: "else"};
        var round = GameFlow.round(board, () => { round(cue) }, () => () => newState);

        expect(() => round(cue)).toThrow();
    });
});
