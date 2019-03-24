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

        it('should update todos', ()=>{
            var todoState = [
                {
                    id: 1,
                    completed: false,
                    text: 'Walk Dog',
                    createdAt: 123,
                    completedAt: null
                }
            ];
            
            var updates = {
                completed: true,
                completedAt: 125
            };

            var action = {
                type: 'UPDATE_TODO',
                id: todoState[0].id,
                updates
            };

            var res = reducers.todosReducer(df(todoState),df(action));

            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toBe(updates.completedAt);
            //Only things that are to be updated are updated. Nothing else is affected.
            expect(res[0].text).toEqual(todoState[0].text);
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

        it('should wipe todos array on logout', ()=>{
            var todoState = [{
                id: 1,
                text: 'Something to do',
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }];
            
            var action = {
                type: 'LOGOUT'
            };

            var res = reducers.todosReducer(df(todoState), df(action));

            expect(res.length).toBe(0);
            expect(res).toEqual([]);
        });
    });

    describe('Auth Reducer', ()=>{
        it('should add uid upon login',()=>{
            var action = {
                type: 'LOGIN',
                uid: '1234abcd'
            };

            var res = reducers.authReducer(df({}), df(action));

            expect(res.uid).toEqual(action.uid);
        });

        it('should remove uid upon logout', ()=>{
            var action = {
                type: 'LOGOUT'
            };

            var authState = {
                uid: 'abcd1234'
            };

            var res = reducers.authReducer(df(authState), df(action));

            expect(res).toEqual({});
        });
    });
});
