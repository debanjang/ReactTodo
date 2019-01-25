var React = require('react');
var {connect} = require('react-redux');

//import the connected component ie. default export
//since the non connected one is only required in Todo.test.jsx file
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

//This named export is only used in correpsonding Test file
export var TodoList = React.createClass({
    
    /* handleOnCompletedTodo: function(id){
        this.props.onCompleteTodo(id);
    }, */
    
    render: function(){
        var {todos, showCompleted, searchText} = this.props;
        var renderTodos = ()=>{
            if(todos.length === 0){
                return <p className="container__message"> Nothing To Do </p>;
            }
            else{
                return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo)=>{
                    {/* Spread operator '{...todos}' 
                        used to pass todos as recieved to be a part of Todo component.
                        ie. Todos.jsx will now have all attributes in todo(id and text)
                        added to its props, Same as: 
                        <Todo key={todo.id} id={todo.id} text={todo.text} */}
                    return(
                       <Todo key={todo.id} {...todo}/>
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

//In order to render the Todos Array correctly in a list, the TodoList component needs access
//to only one part of the state ie. todos. Instead of having it passed by the parent in it's props,
//it can now connect to the store directly and get access to it. 
//The key of the attributes in the object returned from the is set in the props for this component.
//The syntax below should be read as TodoList is connected to the piece of the state contained in the store 
//that is returned by the callback function that is passed as the first arg to the connect function
// The rest of the state ie. the showCompleted, searchText is needed to filter ihe todos.
//this default export that exports the connected component, is used in other files.
export default connect(
    (state)=>{
        return state;
    }
)(TodoList);