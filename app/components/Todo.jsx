import React from 'react';
import moment from 'moment';
import * as actions from 'actions'
import {connect} from 'react-redux';

export class Todo extends React.Component{
    //default constructor takes care of setting props
    render(){
        var {id,text, completed, createdAt, completedAt, dispatch} = this.props;
        var todoClassName = completed ? 'todo todo-completed':'todo'; 
        
        var renderDates = function(){
            var message = "Created ";
            var timestamp = createdAt;
            if(completed){
                message = "Completed ";
                timestamp = completedAt;
            }

            return message+moment.unix(timestamp).format('Do MMMM YYYY @ hh:mm a');
        };

        return(
            <div className={todoClassName} onClick={()=>{
                //dispatch is provided by connecting to the store via connect().
                //Auto Binding is present since we are using arrow function on the onClick listener callback    
                dispatch(actions.startToggleTodo(id, !completed)); 
                }}>
                <div>
                    <input type="checkbox" checked={completed} />
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDates()}</p>
                </div>
            </div>
        );
    }
};

//connect gives access to the state contained in the store and 
//the dispatch function required to dispatch actions to the store. 
//Here since Todos List needs to pass down the todo object anyway
//(since it needs to generate a list of all todos), we only need to dispatch an action to the store
//that replaces the callback passed down from TodoApp via the TodoList component ie. onComplete()
//Even though connect does not take an arg, dispatch is added to the props.
export default connect()(Todo);