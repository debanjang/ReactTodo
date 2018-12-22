var React = require('react');

var AddTodo = React.createClass({

    onFormSubmit: function(e){
        e.preventDefault();
        var todoText = this.refs.todo.value;
        if(todoText.length>0){
            this.refs.todo.value = '';
            this.props.onAddTodo(todoText);
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

module.exports = AddTodo;