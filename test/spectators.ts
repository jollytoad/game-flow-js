/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/game-flow.ts" />

describe("SpectatorCollection", () => {
    it("can be an array", () => {
        var spectator1: GameFlow.Spectator<any> = () => {};
        var spectator2: GameFlow.Spectator<any> = () => {};
        var spectators: GameFlow.SpectatorCollection<any> = [spectator1, spectator2];

        expect(spectators).toBeDefined();
    });
});

describe("Delegating Spectator", () => {
    var state : any;

    beforeEach(function () {
        state = { stuff: "here" };
    });

    it("invokes all spectators with the state", () => {
        var spectator1: GameFlow.Spectator<typeof state> = jasmine.createSpy("spectator1");
        var spectator2: typeof spectator1 = jasmine.createSpy("spectator2");

        var delegator: GameFlow.Spectator<typeof state> = GameFlow.spectators([spectator1, spectator2]);

        delegator(state);

        expect(spectator1).toHaveBeenCalledWith(state);
        expect(spectator2).toHaveBeenCalledWith(state);
    });
});
