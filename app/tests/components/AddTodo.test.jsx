var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');

import {AddTodo} from 'AddTodo';
import * as actions from 'actions';

describe('AddTodo', ()=>{
    it('should exist', ()=>{
        expect(AddTodo).toExist();
    });

    it('should dispatch START_ADD_TODO action when valid input', ()=>{
        var spy = expect.createSpy();
        var todoText = 'Walk Dog';
        var action = actions.startAddTodo(todoText);

        var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodo));
        addTodo.refs.todo.value=todoText;
        //Find the first form element, the only form element
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should not dispatch ADD_TODO action when invalid input', ()=>{
        var spy = expect.createSpy();
        var todoText = '';
        var action = {
            type: 'ADD_TODO',
            text: todoText
        };
        var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
        addTodo.refs.todo.value='';
        var $el = $(ReactDOM.findDOMNode(addTodo));
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toNotHaveBeenCalled();
    });
});