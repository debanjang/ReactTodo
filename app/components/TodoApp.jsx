import React from 'react';

import {connect} from 'react-redux';

//import the default ie. connected todo list 
//since the non connected one will only be required in TodoList test file
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export class TodoApp extends React.Component{

    onLogout(e) {
        e.preventDefault();
        var {dispatch} = this.props;
        dispatch(actions.startLogout());
    }

    render() {
        return(
            <div>
                <div className="page-actions">
                    <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
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
};

export default connect()(TodoApp);