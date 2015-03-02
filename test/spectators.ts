/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/spectators.ts" />

describe("Delegating Spectator", () => {
    var newState : any;
    var oldState : typeof newState;

    beforeEach(function () {
        newState = { stuff: "here" };
        oldState = {};
    });

    it("invokes all spectators with the state", () => {
        var spectator1: GameFlow.Spectator<typeof newState> = jasmine.createSpy("spectator1");
        var spectator2: typeof spectator1 = jasmine.createSpy("spectator2");

        var delegator: GameFlow.Spectator<typeof newState> = GameFlow.spectators([spectator1, spectator2]);

        delegator(newState, oldState);

        expect(spectator1).toHaveBeenCalledWith(newState, oldState);
        expect(spectator2).toHaveBeenCalledWith(newState, oldState);
    });
});
