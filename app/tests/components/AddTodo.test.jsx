var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');

var AddTodo = require('AddTodo');

describe('AddTodo', ()=>{
    it('should exist', ()=>{
        expect(AddTodo).toExist();
    });

    it('should call onAddTodo when called with valida arguments', ()=>{
        var spy = expect.createSpy();

        var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        addTodo.refs.todo.value = 'Cook Dinner';
        var $el = $(ReactDOM.findDOMNode(addTodo));
        //Find the first form element, the only form element
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toHaveBeenCalledWith('Cook Dinner');
    });

    it('should not call onAddTodo when called with invalid arguments', ()=>{
        var spy = expect.createSpy();

        var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        addTodo.refs.todo.value = '';
        var $el = $(ReactDOM.findDOMNode(addTodo));
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toNotHaveBeenCalled();
    });
});