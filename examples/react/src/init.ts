/// <reference path="state.ts" />
/// <reference path="actions.ts" />
/// <reference path="hiflux.ts" />

module app {

    export var hiflux = LoFlux.create(app.defaultState());

    export var addSideEffect = hiflux.addSideEffect;

    export var actions = app.createActions(hiflux.createAction);

}