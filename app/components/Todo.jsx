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
            <div onClick={()=>{this.props.onComplete(id)}}>
                <input type="checkbox" checked={completed} />
                <p>{text}</p>
                <p>{renderDates()}</p>
            </div>
        );
    }
});

module.exports = Todo;