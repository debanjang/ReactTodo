var React = require('react');

var Todo = React.createClass({
    
    /* 
    The arrow function in the onClick handler is the same as calling this.handleClick where: 
    handleClick: function(){
        this.props.onComplete(this.props.id);
    }, */
    
    render: function(){
        var {id,text, completed} = this.props;
        return(
            <div onClick={()=>{this.props.onComplete(id)}}>
                <input type="checkbox" checked={completed} />
                {text}
            </div>
        );
    }
});

module.exports = Todo;