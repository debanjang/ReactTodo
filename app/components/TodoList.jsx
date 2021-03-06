import React from 'react';
import {connect} from 'react-redux';

//import the connected component ie. default export
//since the non connected one is only required in Todo.test.jsx file
import Todo from 'Todo';
import * as TodoAPI from 'TodoAPI';

export class TodoList extends React.Component{
    
    
    render(){
        var {todos, showCompleted, searchText} = this.props;
        var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
        
        var renderTodos = ()=>{
            if(filteredTodos.length === 0){
                return <p className="container__message"> Nothing To Do </p>;
            }
            else{
                return filteredTodos.map((todo)=>{
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
}; 

//In order to render the Todos Array correctly in a list, the TodoList component needs access
//to only one part of the state ie. todos. Instead of having it passed by the parent in it's props,
//it can now connect to the store directly and get access to it. 
//The key of the attributes in the object returned from the state is set in the props for this component.
//The syntax below should be read as TodoList is connected to the piece of the state contained in the store 
//that is returned by the callback function that is passed as the first arg to the connect function
// The rest of the state ie. the showCompleted, searchText is needed to filter ihe todos.
//this default export that exports the connected component, is used in other files.
//dispatch is also set to the props by default when we connect to the store.
export default connect(
    (state)=>{
        return state;
    }
)(TodoList);