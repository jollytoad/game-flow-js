var app;
(function(app) {

    // The state holder (Board)
    var board = GameFlow.board(GameFlow.freeze(app.defaultState(), true));

    // The delegating Spectator
    function spectator(state) {
        app.render(state);
    }

    // Action factory using the board and delegating spectator
    var actionFactory = GameFlow.round.bind(undefined, board, spectator);

    app.actions = app.createActions(actionFactory);

})(app || (app = {}));
