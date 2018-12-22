var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
    
    handleOnCompletedTodo: function(id){
        this.props.onCompleteTodo(id);
    },
    
    render: function(){
        var {todos} = this.props;
        var renderTodos = ()=>{
            if(todos.length === 0){
                return <p className="container__message"> Nothing To Do </p>;
            }
            else{
                return todos.map((todo)=>{
                    {/* Spread operator '{...todos}' 
                        used to pass todos as recieved to be a part of Todo component.
                        ie. Todos.jsx will now have all attributes in todo(id and text)
                        added to its props, Same as: 
                        <Todo key={todo.id} id={todo.id} text={todo.text} */}
                    return(
                       <Todo key={todo.id} {...todo} onComplete={this.handleOnCompletedTodo}/>
                    );
                });
            }
        };
        return(
            <div>
                {renderTodos()}
            </div>
        );
    }
}); 

module.exports = TodoList;