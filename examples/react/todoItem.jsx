/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app;
(function (app) {
    'use strict';

    var { cancel, save, toggle, editTodo, destroy } = app.actions;

    var ESCAPE_KEY = 27;
    var ENTER_KEY = 13;

    app.TodoItem = React.createClass({
        render() {
            var todo = this.props.todo;
            var editText = this.props.editText;

            function handleKeyDown(event) {
                if (event.which === ESCAPE_KEY) {
                    cancel();
                } else if (event.which === ENTER_KEY) {
                    save();
                }
            }

            return (
                <li className={React.addons.classSet({
                    completed: todo.completed,
                    editing: this.props.editing
                })}>
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggle(todo.id)}
                        />
                        <label onDoubleClick={() => editTodo({ id: todo.id, text: todo.title })}>
							{todo.title}
                        </label>
                        <button className="destroy" onClick={() => destroy(todo.id)} />
                    </div>
                    <input
                        ref="editField"
                        className="edit"
                        value={editText}
                        onBlur={() => save()}
                        onChange={(e) => editTodo({ id: todo.id, text: e.target.value })}
                        onKeyDown={handleKeyDown}
                    />
                </li>
            );
        }
    });

})(app || (app = {}));
