var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');
var {Provider} = require('react-redux');

import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';
var reduxStore = require('store');

describe('TodoList', ()=>{
    it('should exist', ()=>{
        expect(TodoList).toExist();
    });

    it('should render one todo for each item in the list', ()=>{
        var todos = [{
            id: '1',
            text: 'Walk the dog',
            completed: false,
            completedAt: undefined,
            createdAt: 500
        },
        {
            id: '2',
            text: 'Play video games',
            completed: false,
            completedAt: undefined,
            createdAt: 500
        }];

        var store = reduxStore.configure({todos});

        var provider = TestUtils.renderIntoDocument(
            <Provider store = {store}>
                <ConnectedTodoList/>
            </Provider>
        );

        //Since the Todo List gets its state from the Redux store and not the parent anymore, 
        //the following line will not work. Hence commenting it out. We need to render todoList
        //with a Provider that can provide the store from where to get the piece of state that todoList needs
        
        //var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        
        //get the TodoList from the rendered Provider
        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        //get all the AddTodo that are rendered within todoList
        var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todoComponents.length).toBe(todos.length);
    });

    //Since we will need to extract the container message from the jQuery el, we need the named export
    //which represents the object in the DOM.
    //The Connected Todo List will only be used when we need to test how the data 
    //from the piece of state is needed. For example the previous test, we need to test:
    //'should render one todo for each item in the list'.
    it('should render empty message if no todos',()=>{
        var todos = [];
        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    })
});