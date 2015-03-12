/// <reference path="../../../loflux/src/locker.ts" />
/// <reference path="../../../loflux/src/round.ts" />
/// <reference path="../../../utils/src/update.ts" />
/// <reference path="state.ts" />
/// <reference path="actions.ts" />

module app {

    // Dummy render function - will be overridden
    export var render = (state:State) => {};

    // The state locker
    var board:LoFlux.Locker<State> = LoFlux.createLocker(Utils.deepFreeze(app.defaultState()));

    // The side-effects
    function sideEffects(state:State) {
        app.render(state);
    }

    // Action factory using the locker and side-effects created above
    var actionFactory = LoFlux.round.bind(undefined, board, sideEffects);

    export var actions = app.createActions(actionFactory);

}