/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var app;
(function (app) {
    'use strict';

    var { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } = app;
    var { clearCompleted } = app.actions;

    function pluralize(count, word) {
        return count === 1 ? word : word + 's';
    }

    app.TodoFooter = React.createClass({
        render() {
            var activeTodoWord = pluralize(this.props.count, 'item');
            var clearButton = null;

            if (this.props.completedCount > 0) {
                clearButton = (
                    <button
                        id="clear-completed"
                        onClick={() => clearCompleted()}>
                        Clear completed ({this.props.completedCount})
                    </button>
                );
            }

            // React idiom for shortcutting to `classSet` since it'll be used often
            var cx = React.addons.classSet;
            var nowShowing = this.props.nowShowing;
            return (
                <footer id="footer">
                    <span id="todo-count">
                        <strong>{this.props.count}</strong> {activeTodoWord} left
                    </span>
                    <ul id="filters">
                        <li>
                            <a
                                href="#/"
                                className={cx({selected: nowShowing === ALL_TODOS})}>
                                All
                            </a>
                        </li>
						{' '}
                        <li>
                            <a
                                href="#/active"
                                className={cx({selected: nowShowing === ACTIVE_TODOS})}>
                                Active
                            </a>
                        </li>
						{' '}
                        <li>
                            <a
                                href="#/completed"
                                className={cx({selected: nowShowing === COMPLETED_TODOS})}>
                                Completed
                            </a>
                        </li>
                    </ul>
					{clearButton}
                </footer>
            );
        }
    });

})(app || (app = {}));
