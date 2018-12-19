var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');

var TodoApp = require('TodoApp');

describe('TodoApp', ()=>{
    it('should exist', ()=>{
        expect(TodoApp).toExist();
    });

    it('should add new todo to the state when handleAddTodo is called',()=>{
        var todoText = 'Test text';
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({
            todos:[]
        });

        todoApp.handleAddTodo(todoText);
        expect(todoApp.state.todos[0].text).toBe(todoText);
    });

    it('should toggle completed value when handleToggleTodo is called', ()=>{
        var todoData = {
            id: 1,
            text: 'Test text',
            completed: false
        };

        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos:[todoData]});

        expect(todoApp.state.todos[0].completed).toBeFalsy();
        todoApp.handleToggleTodo(todoData.id);
        expect(todoApp.state.todos[0].completed).toBeTruthy();

    });
});