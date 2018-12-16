var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

var TodoApp = React.createClass({
    getInitialState: function(){
        return{
            todos:[
                {
                    id: '1',
                    text: 'Walk the dog'
                },
                {
                    id: '2',
                    text: 'Feed the cat'
                },
                {
                    id: '3',
                    text: 'Watch the match'
                },
                {
                    id: '4',
                    text: 'Play video games'
                }
            ]
        };
    },

    handleAddTodo: function(text){
        alert('new  todo: '+text);
    },
    
    render: function(){
        var {todos} = this.state;
        return(
            <div className="columns medium-6 large-4 small-centered">
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;