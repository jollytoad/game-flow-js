/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/delegate.ts" />

describe("Delegate", () => {
    var newState : any;
    var oldState : typeof newState;

    beforeEach(function () {
        newState = { stuff: "here" };
        oldState = {};
    });

    it("invokes all functions with the given args", () => {
        var spectator1 = jasmine.createSpy("spectator1");
        var spectator2 = jasmine.createSpy("spectator2");

        var delegator = Utils.delegate([spectator1, spectator2]);

        delegator(newState, oldState);

        expect(spectator1).toHaveBeenCalledWith(newState, oldState);
        expect(spectator2).toHaveBeenCalledWith(newState, oldState);
    });
});
