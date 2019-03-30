import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

export class AddTodo extends React.Component{

    onFormSubmit(e) {
        e.preventDefault();
        var todoText = this.refs.todo.value;
        var {dispatch} = this.props;
        if(todoText.length>0){
            this.refs.todo.value = '';
            dispatch(actions.startAddTodo(todoText));
        }
    }

    render() {
        return(
            <div className="container__footer">
                <form onSubmit = {this.onFormSubmit.bind(this)}>
                    <div>
                        <input type="text" ref="todo" placeholder="What do you need to do"/>
                        <button className="button expanded">Add</button>
                    </div>
                </form>
            </div>
        );
    }

}


export default connect()(AddTodo);