/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app;
(function (app) {
    'use strict';

    var { TodoFooter, TodoItem } = app;
    var { ACTIVE_TODOS, COMPLETED_TODOS } = app;
    var { addTodo, toggleAll, editNewTodo } = app.actions;

    var ENTER_KEY = 13;

    var TodoApp = React.createClass({
        render() {
            var footer;
            var main;
            var state = this.props.state;

            var shownTodos = state.todos.filter(function (todo) {
                switch (state.nowShowing) {
                    case ACTIVE_TODOS:
                        return !todo.completed;
                    case COMPLETED_TODOS:
                        return todo.completed;
                    default:
                        return true;
                }
            }, this);

            var todoItems = shownTodos.map(function (todo) {
                var isEditing = state.editing === todo.id;
                return (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        editing={isEditing}
                        editText={isEditing ? state.editText : null}
                    />
                );
            }, this);

            var activeTodoCount = state.todos.reduce(function (accum, todo) {
                return todo.completed ? accum : accum + 1;
            }, 0);

            var completedCount = state.todos.length - activeTodoCount;

            if (activeTodoCount || completedCount) {
                footer =
                    <TodoFooter
                        count={activeTodoCount}
                        completedCount={completedCount}
                        nowShowing={state.nowShowing}
                    />;
            }

            if (state.todos.length) {
                main = (
                    <section id="main">
                        <input
                            id="toggle-all"
                            type="checkbox"
                            onChange={(e) => toggleAll(e.target.checked)}
                            checked={activeTodoCount === 0}
                        />
                        <ul id="todo-list">
							{todoItems}
                        </ul>
                    </section>
                );
            }

            function handleNewTodoKeyDown(event) {
                if (event.which === ENTER_KEY) {
                    event.preventDefault();
                    addTodo(state.addText);
                }
            }

            return (
                <div>
                    <header id="header">
                        <h1>todos</h1>
                        <input
                            ref="newField"
                            id="new-todo"
                            placeholder="What needs to be done?"
                            value={state.addText}
                            onChange={(e) => editNewTodo(e.target.value)}
                            onKeyDown={handleNewTodoKeyDown}
                            autoFocus={true}
                        />
                    </header>
					{main}
					{footer}
                </div>
            );
        }
    });

    app.render = (state) => {
        React.render(
            <TodoApp state={state}/>,
            document.getElementById('todoapp')
        );
    };

})(app || (app = {}));
