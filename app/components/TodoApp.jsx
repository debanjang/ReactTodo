var React = require('react');
var TodoList = require('TodoList');

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
    
    render: function(){
        var {todos} = this.state;
        return(
            <div>
                <TodoList todos={todos}/>
            </div>
        );
    }
});

module.exports = TodoApp;