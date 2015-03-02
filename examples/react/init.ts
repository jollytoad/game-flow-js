/// <reference path="../../src/board.ts" />
/// <reference path="../../src/round.ts" />
/// <reference path="../../src/update.ts" />
/// <reference path="state.ts" />
/// <reference path="actions.ts" />

module app {

    // Dummy render function - will be overridden
    export var render = (state:State) => {};

    // The state holder (Board)
    var board:GameFlow.Board<State> = GameFlow.board(GameFlow.freeze(app.defaultState(), true));

    // The delegating Spectator
    function spectator(state:State) {
        app.render(state);
    }

    // Action factory using the board and delegating spectator
    var actionFactory = GameFlow.round.bind(undefined, board, spectator);

    export var actions = app.createActions(actionFactory);

}