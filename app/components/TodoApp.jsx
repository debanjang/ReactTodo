var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

//import the default ie. connected todo list 
//since the non connected one will only be required in TodoList test file
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

var TodoApp = React.createClass({

    render: function(){
        return(
            <div>
                <div className="page-title">
                    <h1>Todo App</h1>
                </div>
                <div className="row">
                    <div className="container column small-11 medium-7 large-5 small-centered">
                        <TodoSearch/>
                        <TodoList/>
                        <AddTodo/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;