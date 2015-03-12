module app {

    // Application State definition

    export var ALL_TODOS = 'all';
    export var ACTIVE_TODOS = 'active';
    export var COMPLETED_TODOS = 'completed';

    export interface State {
        todos: Todo[];
        nowShowing: string;
        editing?: string;
        editText?: string;
        addText?: string;
    }

    export interface Todo {
        id: string;
        title: string;
        completed: boolean;
    }

    export function defaultState():State {
        return {
            todos: [],
            nowShowing: ALL_TODOS,
            editing: null,
            editText: null,
            addText: null
        };
    }

}
