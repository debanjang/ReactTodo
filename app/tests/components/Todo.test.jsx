var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');

//Since we are exporting default and Todo from Todo.jsx, lets use import which is the new standard.
//In this case, we will use the named export only, since we dont need to fetch a piece of the state 
//from the Redux Store
import {Todo} from 'Todo';

import * as actions from 'actions';

describe('Todo', ()=>{
    it('should exist', ()=>{
        expect(Todo).toExist();
    });

    it('should dispatch TOGGLE_TODO action with the correct id',()=>{
        var spy = expect.createSpy();
        var todoData = {
            id: 11,
            completed: false,
            text: 'Test text'
        };

        var action = actions.startToggleTodo(todoData.id, !todoData.completed);
        var todo = TestUtils.renderIntoDocument(<Todo key={todoData.id} {...todoData} dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todo));
        TestUtils.Simulate.click($el[0]);
        expect(spy).toHaveBeenCalledWith(action);
    });
});