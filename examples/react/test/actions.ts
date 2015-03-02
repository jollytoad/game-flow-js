/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../src/board.ts" />
/// <reference path="../../../src/round.ts" />
/// <reference path="../state.ts" />
/// <reference path="../actions.ts" />

describe("actions", () => {

    var state: app.State;
    var todos: app.Todo[];
    var actions: app.Actions;


    function given(modifyState: (s: app.State) => void) {
        var initState = app.defaultState();

        modifyState(initState);

        // The state holder (Board)
        var board:GameFlow.Board<app.State> = GameFlow.board(GameFlow.freeze(initState, true));

        function spectator(newState: app.State) {
            state = newState;
            todos = state.todos;
        }

        actions = app.createActions(GameFlow.round.bind(undefined, board, spectator));
    }

    function todo(title: string, completed:boolean = false): app.Todo {
        return {
            id: app.uuid(),
            title: title,
            completed: completed
        };
    }

    beforeEach(() => {
        state = null;
        todos = null;
        actions = null;
    });

    describe("addTodo", () => {

        it("adds a todo to an empty todo list", () => {
            given((state: app.State) => {
                state.addText = "Only Todo";
            });

            actions.addTodo();

            expect(todos.length).toBe(1);
            expect(todos[0].id).toBeDefined();
            expect(todos[0].title).toBe("Only Todo");
            expect(todos[0].completed).toBe(false);
        });

        it("adds a todo to the end of a populated todo list", () => {
            given((state: app.State) => {
                state.todos = [ todo("Here"), todo("There") ];
                state.addText = "Everywhere";
            });

            actions.addTodo();

            expect(todos.length).toBe(3);
            expect(todos[2].title).toBe("Everywhere");
        });
    });

    describe("toggleAll", () => {

        it("can set completed of all todos to true", () => {
            given((state: app.State) => {
                state.todos = [ todo("Here",true), todo("There",false) ];
            });

            actions.toggleAll(true);

            expect(todos[0].completed).toBe(true);
            expect(todos[1].completed).toBe(true);
        });

        it("can set completed of all todos to false", () => {
            given((state: app.State) => {
                state.todos = [ todo("Here",true), todo("There",false) ];
            });

            actions.toggleAll(false);

            expect(todos[0].completed).toBe(false);
            expect(todos[1].completed).toBe(false);
        });
    });

    describe("toggle", () => {

        it("will set completed false to true", () => {
            var originalTodo = todo("Here",false);
            given((state: app.State) => {
                state.todos = [ originalTodo ];
            });

            actions.toggle(originalTodo.id);

            expect(todos[0].completed).toBe(true);
        });

        it("will set completed true to false", () => {
            var originalTodo = todo("Here",true);
            given((state: app.State) => {
                state.todos = [ originalTodo ];
            });

            actions.toggle(originalTodo.id);

            expect(todos[0].completed).toBe(false);
        });
    });

});
