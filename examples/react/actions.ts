/// <reference path="../../src/players.ts" />
/// <reference path="../../src/clone.ts" />
/// <reference path="../../src/update.ts" />
/// <reference path="../../src/curry.ts" />
/// <reference path="../../src/chain.ts" />
/// <reference path="../../src/if.ts" />
/// <reference path="state.ts" />

module app {

    interface Action<C> {
        (player:(cue?:C) => (state:State) => State): (cue?:C) => void;
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
        addTodo(title: string): void;
        toggleAll(completed: boolean): void;
        toggle(id: string): void;
        destroy(id: string): void;
        save(cue:{ id: string; text: string }): void;
        clearCompleted(): void;
        editTodo(cue:{ id: string; text: string }): void;
        cancel(): void;
    }

    export function createActions(action: Action<any>): Actions {

        var curry = GameFlow.curry;
        var chain = GameFlow.chain;
        var ifElse = GameFlow.ifElse;

        // A state update fn using the clone & freeze utilities from GameFlow
        var update = curry(GameFlow.immutableUpdate)(curry(GameFlow.cloneSetFreeze)(GameFlow.clone, GameFlow.freeze));

        function createTodo(title:string) {
            return {
                id: uuid(),
                title: title,
                completed: false
            };
        }

        function map<T>(doit:(item:T) => any):(list:T[]) => T[] {
            return list => list.map(doit);
        }

        function where<T>(predicate:(item:T) => boolean, doit:(item:T) => any):(list:T[]) => T[] {
            return list => list.map(ifElse<T>(predicate, doit));
        }

        function retain<T>(predicate:(item:T) => boolean):(list:T[]) => T[] {
            return list => list.filter(predicate);
        }

        return {
            begin: action((cue:any) => update('begin', () => true)),

            editNewTodo: action((text:string) =>
                    update('addText', () => text.trim())
            ),

            addTodo: action((cue:string) =>
                    ifElse<State>(
                        (s) => !!cue,
                        chain<State>(
                            update('todos', (todos:Todo[]) => todos.concat(createTodo(cue))),
                            update('addText', () => null)
                        )
                    )
            ),

            toggleAll: action((completed:boolean) =>
                    update('todos', map<Todo>(update('completed', () => completed)))
            ),

            toggle: action((id:string) =>
                    update('todos', where<Todo>(todo => todo.id === id, update('completed', (completed:boolean) => !completed)))
            ),

            destroy: action((id:string) =>
                    update('todos', retain<Todo>(todo => todo.id !== id))
            ),

            save: action((cue:{ id: string; text: string }) => (state:State) =>
                    update('editing', () => null,
                        !cue.text ? state :
                            update('editText', () => null,
                                update('todos', (todos:Todo[]) => todos.map(ifElse<Todo>(todo => todo.id === cue.id, update('title', () => cue.text))),
                                    state
                                )
                            )
                    )
            ),

            clearCompleted: action((cue:any) =>
                    update('todos', retain<Todo>(todo => !todo.completed))
            ),

            editTodo: action((cue:{ id: string; text: string }) =>
                    chain<State>(
                        update('editing', () => cue.id),
                        update('editText', () => cue.text.trim())
                    )
            ),

            cancel: action((cue:any) =>
                    chain<State>(
                        update('editing', () => null),
                        update('editText', () => null)
                    )
            )
        };
    }

}
