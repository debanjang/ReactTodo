var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

//import the default ie. connected todo list 
//since the non connected one will only be required in TodoList test file
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
    getInitialState: function(){
        return{
            searchText:'',
            showCompleted:false,
            todos: TodoAPI.getTodos()
        };
    },

    /* As soon the state updates by adding a new todo, we want to store that in localStorage.
    We use ComponentDidUpdate for this purpose */
    componentDidUpdate(prevProps, prevState){
        if(prevState.todos!==this.state.todos){
            TodoAPI.setTodos(this.state.todos);
        }
    },

    handleAddTodo: function(text){
        this.setState({
            todos:[
                ...this.state.todos,
                {
                    id: uuid(),
                    completed: false,
                    text: text,
                    createdAt: moment().unix(),
                    completedAt: undefined
                }
            ]
        })
    },

    handleSearch: function(searchText, showCompleted){
        this.setState({
            searchText: searchText.toLowerCase(),
            showCompleted: showCompleted
        });

        console.log('SearchText: '+this.state.searchText+' showCompleted: '+this.state.showCompleted);
    },

    render: function(){
        var {todos, showCompleted, searchText} = this.state;
        var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
        return(
            <div>
                <div className="page-title">
                    <h1>Todo App</h1>
                </div>
                <div className="row">
                    <div className="container column small-11 medium-7 large-5 small-centered">
                        <TodoSearch onSearch={this.handleSearch}/>
                        <TodoList/>
                        <AddTodo onAddTodo={this.handleAddTodo}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;