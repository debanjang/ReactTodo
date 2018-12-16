var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
    render: function(){
        var {todos} = this.props;
        var renderTodos = ()=>{
            return todos.map((todo)=>{
                {/* Spread operator '{...todos}' 
                    used to pass todos as recieved to be a part of Todo component.
                    ie. Todos.jsx will now have all attributes in todo(id and text)
                    added to its props */}
                return(
                   <Todo key={todo.id} {...todo}/>
                );
            });
        };
        return(
            <div>
                {renderTodos()}
            </div>
        );
    }
}); 

module.exports = TodoList;