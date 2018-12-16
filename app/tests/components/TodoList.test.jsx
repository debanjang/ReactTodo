var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', ()=>{
    it('should exist', ()=>{
        expect(TodoList).toExist();
    });

    it('should render one todo for each item in the list', ()=>{
        var todos = [{
            id: '1',
            text: 'Walk the dog'
        },
        {
            id: '2',
            text: 'Play video games'
        }];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        //get all the AddTodo that are rendered within todoList
        var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

        expect(todoComponents.length).toBe(todos.length);
    });
});