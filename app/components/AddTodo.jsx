var React = require('react');
var {connect} = require('react-redux');

var actions = require('actions');

export var AddTodo = React.createClass({

    onFormSubmit: function(e){
        e.preventDefault();
        var todoText = this.refs.todo.value;
        var {dispatch} = this.props;
        if(todoText.length>0){
            this.refs.todo.value = '';
            dispatch(actions.addTodo(todoText));
        }
    },

    render: function(){
        return(
            <div className="container__footer">
                <form onSubmit = {this.onFormSubmit}>
                    <div>
                        <input type="text" ref="todo" placeholder="What do you need to do"/>
                        <button className="button expanded">Add</button>
                    </div>
                </form>
            </div>
        );
    }
});

export default connect()(AddTodo);