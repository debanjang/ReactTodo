var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');

//var TodoSearch = require('TodoSearch');
import {TodoSearch} from 'TodoSearch';

describe('TodoSearch', ()=>{
    it('should exist',()=>{
        expect(TodoSearch).toExist();
    });

    it('should dispatch SET_SEARCH_TEXT action on input change', ()=>{
        var searchText = 'Walk'
        var spy = expect.createSpy();
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText
        }

        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);
        var $el = $(ReactDOM.findDOMNode(todoSearch));
        
        todoSearch.refs.searchText.value = searchText;
        TestUtils.Simulate.change($el.find('input')[0]);

        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch TOGGLE_SHOW_COMPLETED action when checkbox checked', ()=>{
        var spy = expect.createSpy();
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        };
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);
        
        todoSearch.refs.showCompleted.checked = true;
        var $el = $(ReactDOM.findDOMNode(todoSearch));

        TestUtils.Simulate.change($el.find('input')[1]);
        expect(spy).toHaveBeenCalledWith(action);
    });
});