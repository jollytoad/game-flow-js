/// <reference path="../../src/players.ts" />
/// <reference path="../../src/clone.ts" />
/// <reference path="../../src/update.ts" />
/// <reference path="../../src/curry.ts" />
/// <reference path="state.ts" />

module app {

    interface Action<C> {
        (player:GameFlow.Player<C,app.State>): any;
    }

    interface Update<S, T> {
        (update:(orig:T) => T, state:S): S;
    }

    export function uuid() {
        /*jshint bitwise:false */
        var i: number, random: number;
        var uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }

        return uuid;
    }

    export interface Actions {
        begin(): void;
        editNewTodo(text: string): void;
        addTodo(): void;
        toggleAll(completed: boolean): void;
        toggle(id: string): void;
        destroy(id: string): void;
        save(): void;
        clearCompleted(): void;
        editTodo(cue:{ id: string; text: string }): void;
        cancel(): void;
    }

    export function createActions(action:Action<any>): Actions {

        var curry = GameFlow.curry;

        // A state update fn using the clone & freeze utilities from GameFlow
        var update = curry(GameFlow.immutableUpdate)(curry(GameFlow.cloneSetFreeze)(GameFlow.clone, GameFlow.freeze));

        // State update utility functions
        var updateTodos:Update<app.State,Todo[]> = update(['todos']);
        var updateCompleted:Update<Todo,boolean> = update(['completed']);
        var updateTitle:Update<Todo,string> = update(['title']);
        var updateEditing:Update<app.State,string> = update(['editing']);
        var updateEditText:Update<app.State,string> = update(['editText']);
        var updateAddText:Update<app.State,string> = update(['addText']);

        return {
            begin: action((cue:any, state:app.State) => update(['begin'], () => true, state)),

            editNewTodo: action((text:string, state:app.State) =>
                    updateAddText(() => text.trim(), state)
            ),

            addTodo: action((cue:any, state:app.State) =>
                    !state.addText ? state :
                        updateAddText(() => null,
                            updateTodos(todos =>
                                    todos.concat(<Todo>{
                                        id: uuid(),
                                        title: state.addText.trim(),
                                        completed: false
                                    }),
                                state
                            )
                        )
            ),

            toggleAll: action((completed:boolean, state:app.State) =>
                    updateTodos(todos =>
                            todos.map(todo => updateCompleted(() => completed, todo)),
                        state
                    )
            ),

            toggle: action((id:string, state:app.State) =>
                    updateTodos(todos =>
                            todos.map(todo => todo.id !== id ? todo : updateCompleted(completed => !completed, todo)),
                        state
                    )
            ),

            destroy: action((id:string, state:app.State) =>
                    updateTodos(todos =>
                            todos.filter(todo => todo.id !== id),
                        state
                    )
            ),

            save: action((cue:any, state:app.State) =>
                    updateEditing(() => null,
                        !state.editText ? state :
                            updateTodos(todos =>
                                    todos.map(todo => todo.id !== state.editing ? todo : updateTitle(() => state.editText, todo)),
                                state
                            )
                    )
            ),

            clearCompleted: action((cue:any, state:app.State) =>
                    updateTodos(todos =>
                            todos.filter(todo => !todo.completed),
                        state
                    )
            ),

            editTodo: action((cue:{ id: string; text: string }, state:app.State) =>
                    updateEditing(() => cue.id, updateEditText(() => cue.text.trim(), state))
            ),

            cancel: action((cue:any, state:app.State) =>
                    updateEditing(() => null, updateEditText(() => null, state))
            )
        };
    }

}
