/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app;
(function (app) {
    'use strict';

    var { renderer } = app;
    var { cancel, save, toggle, editTodo, destroy } = app.actions;

    var ESCAPE_KEY = 27;
    var ENTER_KEY = 13;

    app.TodoItem = renderer(({ todo, editText, editing }) => {

            function handleKeyDown(event) {
                if (event.which === ESCAPE_KEY) {
                    cancel();
                } else if (event.which === ENTER_KEY) {
                    save(todo.id, event.target.value);
                }
            }

            return (
                <li className={React.addons.classSet({
                    completed: todo.completed,
                    editing: editing
                })}>
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggle(todo.id)}
                        />
                        <label onDoubleClick={() => editTodo(todo.id, todo.title)}>
							{todo.title}
                        </label>
                        <button className="destroy" onClick={() => destroy(todo.id)} />
                    </div>
                    <input
                        ref="editField"
                        className="edit"
                        value={editText}
                        onBlur={(e) => save(todo.id, e.target.value)}
                        onChange={(e) => editTodo(todo.id, e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </li>
            );
        });

})(app || (app = {}));
