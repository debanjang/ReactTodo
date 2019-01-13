var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');


describe('Reducers',()=>{
    describe('Search Text Reducer',()=>{
        it('should set search text',()=>{
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'dog'
            };

            var res = reducers.searchTextReducer(df(''),df(action));

            expect(res).toEqual(action.searchText);
        });
    });

    describe('Show Completed Reducer',()=>{
        it('should toggle completed',()=>{
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            var res = reducers.showCompletedReducer(df(true), df(action));

            expect(res).toBeFalsy();
        });
    });
});
