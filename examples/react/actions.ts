/// <reference path="../../src/players.ts" />
/// <reference path="../../src/clone.ts" />
/// <reference path="../../src/update.ts" />
/// <reference path="../../src/curry.ts" />
/// <reference path="state.ts" />

module app {

    interface Action<C> {
        (player:GameFlow.Player<C,State>): any;
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

        return {
            begin: action((cue:any) => update('begin', () => true)),

            editNewTodo: action((text:string) =>
                    update('addText', () => text.trim())
            ),

            addTodo: action((cue:any) => (state:State) =>
                    !state.addText ? state :
                        update('addText', () => null,
                            update('todos', (todos:Todo[]) =>
                                    todos.concat(<Todo>{
                                        id: uuid(),
                                        title: state.addText.trim(),
                                        completed: false
                                    }),
                                state
                            )
                        )
            ),

            toggleAll: action((completed:boolean) =>
                    update('todos', (todos:Todo[]) => todos.map(update('completed', () => completed)))
            ),

            toggle: action((id:string) =>
                    update('todos', (todos:Todo[]) =>
                            todos.map(todo => todo.id !== id ? todo : update('completed', (completed:boolean) => !completed, todo)))
            ),

            destroy: action((id:string) =>
                    update('todos', (todos:Todo[]) =>
                            todos.filter(todo => todo.id !== id))
            ),

            save: action((cue:any) => (state:State) =>
                    update('editing', () => null,
                        !state.editText ? state :
                            update('editText', () => null,
                                update('todos', (todos:Todo[]) =>
                                        todos.map(todo => todo.id !== state.editing ? todo : update('title', () => state.editText, todo)),
                                    state
                                )
                            )
                    )
            ),

            clearCompleted: action((cue:any) =>
                    update('todos', (todos:Todo[]) =>
                            todos.filter(todo => !todo.completed))
            ),

            editTodo: action((cue:{ id: string; text: string }) => (state:State) =>
                    update('editing', () => cue.id, update('editText', () => cue.text.trim(), state))
            ),

            cancel: action((cue:any) => (state:State) =>
                    update('editing', () => null, update('editText', () => null, state))
            )
        };
    }

}
