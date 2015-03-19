/// <reference path="../../../utils/src/clone.ts" />
/// <reference path="../../../utils/src/freeze.ts" />
/// <reference path="../../../utils/src/update.ts" />
/// <reference path="../../../utils/src/curry.ts" />
/// <reference path="../../../utils/src/chain.ts" />
/// <reference path="../../../utils/src/if.ts" />
/// <reference path="state.ts" />

module app {

    interface Action {
        (player:(...cue:any[]) => (state:State) => State): (...cue:any[]) => void;
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
        save(id: string, title: string): void;
        clearCompleted(): void;
        editTodo(id: string, title: string): void;
        cancel(): void;
    }

    export function createActions(action: Action): Actions {

        var curry = Utils.curry;
        var chain = Utils.chain;
        var ifElse = Utils.ifElse;

        // A state update fn using the clone & freeze utilities from Utils
        var update = curry(Utils.update)(curry(Utils.cloneSetFreeze)(Utils.clone, Utils.deepFreeze));

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
                    update('addText', () => text)
            ),

            addTodo: action((cue:string) =>
                    ifElse<State>(
                        (s) => !!cue,
                        chain<State>(
                            update('todos', (todos:Todo[]) => todos.concat(createTodo(cue.trim()))),
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

            save: action((id:string, title:string) => (state:State) =>
                    update('editing', () => null,
                        !title ? state :
                            update('editText', () => null,
                                update('todos', (todos:Todo[]) => todos.map(ifElse<Todo>(todo => todo.id === id, update('title', () => title.trim()))),
                                    state
                                )
                            )
                    )
            ),

            clearCompleted: action((cue:any) =>
                    update('todos', retain<Todo>(todo => !todo.completed))
            ),

            editTodo: action((id: string, title: string) =>
                    chain<State>(
                        update('editing', () => id),
                        update('editText', () => title)
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
