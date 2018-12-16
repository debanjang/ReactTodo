var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
var expect = require('expect');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', ()=>{
    it('should exist',()=>{
        expect(TodoSearch).toExist();
    });

    it('should call onSearch with correct text value from search box', ()=>{
        var spy = expect.createSpy();
        
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);
        todoSearch.refs.searchText.value = 'Walk';
        //todoSearch.refs.showCompleted.checked = true;
        var $el = $(ReactDOM.findDOMNode(todoSearch));

        TestUtils.Simulate.change($el.find('input')[0]);
        //TestUtils.Simulate.change($el.find('input')[1]);
        expect(spy).toHaveBeenCalledWith('Walk',false);
    });

    it('should call onSearch with correct checked value from checkbox', ()=>{
        var spy = expect.createSpy();
        
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);
        todoSearch.refs.showCompleted.checked = true;
        var $el = $(ReactDOM.findDOMNode(todoSearch));

        TestUtils.Simulate.change($el.find('input')[1]);
        expect(spy).toHaveBeenCalledWith('',true);
    });
});