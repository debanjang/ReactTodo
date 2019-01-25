var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');
var {Provider} = require('react-redux')

var TodoApp = require('TodoApp');
//import the default ie. connected todo list 
//since the non connected one will only be required in TodoList test file
import TodoList from 'TodoList';
var configureStore = require('store');

describe('TodoApp', ()=>{
    it('should exist', ()=>{
        expect(TodoApp).toExist();
    });

    //in order to render TodoList, we need to define the store and we need a provider for that.
    it('should render Todo List',()=>{
        var store = configureStore.configure();
        var provider = TestUtils.renderIntoDocument(
        <Provider store={store}>
            <TodoApp/>
        </Provider>);
        
        var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
        var todoListArray = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);
        //Expect only one TodoList to exist
        expect(todoListArray.length).toEqual(1);
    });
});