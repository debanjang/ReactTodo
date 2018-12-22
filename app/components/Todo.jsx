var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
    
    /* 
    The arrow function in the onClick handler is the same as calling this.handleClick where: 
    handleClick: function(){
        this.props.onComplete(this.props.id);
    }, */
    
    render: function(){
        var {id,text, completed, createdAt, completedAt} = this.props;
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
            <div className={todoClassName} onClick={()=>{this.props.onComplete(id)}}>
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

module.exports = Todo;