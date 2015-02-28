/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/game-flow.ts" />

describe("Player Chain", () => {
    var cue: any;
    var state: any;
    var state1: typeof state;
    var state2: typeof state;
    var player1: GameFlow.Player<typeof cue, typeof state>;
    var player2: typeof player1;

    beforeEach(function () {
        cue = { type: "doit" };
        state = { stuff: "here" };
        state1 = { changed: "once" };
        state2 = { changed: "twice" };
        player1 = () => state1;
        player2 = () => state2;
    });

    it("passes cue and initial state into first player", () => {
        var player1: GameFlow.Player<typeof cue, typeof state> = jasmine.createSpy("player1");

        var chain: GameFlow.Player<typeof cue, typeof state> = GameFlow.players([player1]);

        chain(cue, state);
        expect(player1).toHaveBeenCalledWith(cue,state);
    });

    it("passes cue and result of first player into next player", () => {
        var player2: GameFlow.Player<typeof cue, typeof state> = jasmine.createSpy("player2");

        var chain: GameFlow.Player<typeof cue, typeof state> = GameFlow.players([player1, player2]);

        chain(cue, state);
        expect(player2).toHaveBeenCalledWith(cue,state1);
    });

    it("returns result from last player", () => {
        var chain: GameFlow.Player<typeof cue, typeof state> = GameFlow.players([player1, player2]);

        expect(chain(cue, state)).toBe(state2);
    });
});
