var React = require('react');
var moment = require('moment');
var actions = require('actions');
var {connect} = require('react-redux');

export var Todo = React.createClass({
    
    /* 
    The arrow function in the onClick handler is the same as calling this.handleClick where: 
    handleClick: function(){
        this.props.onComplete(this.props.id);
    }, */
    
    render: function(){
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
        }

        return(
            <div className={todoClassName} onClick={()=>{
                    dispatch(actions.toggleTodo(id)); //dispatch is provided by connecting to the store via connect()
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
});

//connect gives access to the state contained in the store and 
//the dispatch function required to dispatch actions to the store. 
//Here since Todos List needs to pass down the todo object anyway
//(since it needs to generate a list of all todos), we only need to dispatch an action to the store
//that replaces the callback passed down from TodoApp via the TodoList component ie. onComplete()
//Even though connect does not take an arg, dispatch is added to the props.
export default connect()(Todo);