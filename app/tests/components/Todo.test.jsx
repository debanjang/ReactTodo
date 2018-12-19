var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');

var Todo = require('Todo');

describe('Todo', ()=>{
    it('should exist', ()=>{
        expect(Todo).toExist();
    });

    it('should call onComplete with the correct id',()=>{
        var spy = expect.createSpy();
        var todoData = {
            id: 11,
            completed: false,
            text: 'Test text'
        };
        var todo = TestUtils.renderIntoDocument(<Todo key={todoData.id} {...todoData} onComplete={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todo));
        TestUtils.Simulate.click($el[0]);
        expect(spy).toHaveBeenCalledWith(11);
    });
});