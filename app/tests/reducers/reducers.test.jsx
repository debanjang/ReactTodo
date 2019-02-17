var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');


describe('Reducers',()=>{
    describe('Search Text Reducer',()=>{
        it('should set search text',()=>{
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'Walk'
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

    describe('Todos Reducer',()=>{
        it('should add new todo',()=>{
            var action = {
                type: 'ADD_TODO',
                todo:{
                    id: '123abc',
                    text: 'Something to do'
                }
            };

            var res = reducers.todosReducer(df([]),df(action));

            expect(res.length).toBe(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('should toggle todos', ()=>{
            var state = [
                {
                    id: 1,
                    completed: false,
                    text: 'Walk Dog',
                    createdAt: 123,
                    completedAt: undefined
                }
            ];
            
            var action = {
                type: 'TOGGLE_TODO',
                id: 1
            };

            var res = reducers.todosReducer(df(state),df(action));

            expect(res[0].completed).toBeTruthy();
            expect(res[0].completedAt).toNotBe(undefined);
        });

        it('should add exisiting todos',()=>{
            var todos=[{
                id: 1,
                text: 'Something to do',
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }];
            
            var action={
                type: 'ADD_TODOS',
                todos
            };

            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toBe(1);
            expect(res[0]).toEqual(todos[0]);
        });
    });
});
