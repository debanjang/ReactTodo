var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass({
    getInitialState: function(){
        return{
            searchText:'',
            showCompleted:false,
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

    handleSearch: function(searchText, showCompleted){
        this.setState({
            searchText: searchText.toLowerCase(),
            showCompleted: showCompleted
        });

        console.log('SearchText: '+this.state.searchText+' showCompleted: '+this.state.showCompleted);
    },
    
    render: function(){
        var {todos} = this.state;
        return(
            <div className="columns medium-6 large-4 small-centered">
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;