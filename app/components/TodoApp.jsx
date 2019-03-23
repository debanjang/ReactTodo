import React from 'react';

import {connect} from 'react-redux';

//import the default ie. connected todo list 
//since the non connected one will only be required in TodoList test file
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export var TodoApp = React.createClass({

    //es6 way of defining a method as an object attribute
    onLogout() {
        var {dispatch} = this.props;

        dispatch(actions.startLogout());
    },

    //es5 way of defining a method as an object attribute
    render: function(){
        return(
            <div>
                <div className="page-actions">
                    <a href="#" onClick={this.onLogout}>Logout</a>
                </div>

                <h1 className="page-title">Todo App</h1>

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

export default connect()(TodoApp);