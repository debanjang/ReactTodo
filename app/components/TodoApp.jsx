var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
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

    handleToggleTodo: function(id){
        var updatedTodos = this.state.todos.map((todo)=>{
            if(todo.id === id){
                debugger;
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed? moment().unix(): undefined;
            }
            
            return todo;
        });

        this.setState({todos: updatedTodos});
    },
    
    render: function(){
        var {todos, showCompleted, searchText} = this.state;
        var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
        return(
            <div className="columns medium-6 large-4 small-centered">
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={filteredTodos} onCompleteTodo={this.handleToggleTodo}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;