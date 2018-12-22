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

    it('should add new todo to the state when handleAddTodo is called', ()=>{
        var todoText = 'Test text';
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({
            todos:[]
        });

        todoApp.handleAddTodo(todoText);
        expect(todoApp.state.todos[0].text).toBe(todoText);
        expect(todoApp.state.todos[0].createdAt).toBeGreaterThan(0);
    });

    it('should toggle completed value when handleToggleTodo is called', ()=>{
        var todoData = {
            id: 1,
            text: 'Test text',
            completed: false,
            createdAt:0,
            completedAt: undefined
        };

        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos:[todoData]});

        expect(todoApp.state.todos[0].completed).toBeFalsy();
        todoApp.handleToggleTodo(todoData.id);
        expect(todoApp.state.todos[0].completed).toBeTruthy();
        expect(todoApp.state.todos[0].completedAt).toBeA('number');
    });

    it('should change completed value to false when handleToggleTodo is called', ()=>{
        var todoData = {
            id: 1,
            text: 'Test text',
            completed: true,
            createdAt:0,
            completedAt: 0
        };

        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos:[todoData]});

        expect(todoApp.state.todos[0].completed).toBeTruthy();
        todoApp.handleToggleTodo(todoData.id);
        expect(todoApp.state.todos[0].completed).toBeFalsy();
        expect(todoApp.state.todos[0].completedAt).toNotExist();
    });
});