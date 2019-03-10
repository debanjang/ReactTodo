var expect = require('expect');
var actions = require('actions');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import firebase, {firebaseRef} from 'app/firebase/';

//create a mock store
var createStore = configureMockStore([thunk]);


describe('Actions', ()=>{
    it('should generate search text action', ()=>{
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Some search text'
        };

        var res = actions.setSearchText('Some search text');

        expect(res).toEqual(action);
    });

    it('should generate add todo action', ()=>{
        var todo = {
            id:'123abc',
            text: 'Something to do',
            completed: false,
            createdAt: 0,
            completedAt: undefined
        };
        var action= {
            type: 'ADD_TODO',
            todo
        };

        var res = actions.addTodo(todo);

        expect(res).toEqual(action);
    });

    /* 'done' denotes that this is a test for an async operation
    We use 'done' to tell Mocha to stop listening for assertions and errors 
    only when done() is called.
    Even the catch block is called with done. If in case anything goes wrong 
    done() will be called with the error object. 
    If 'done' is called with any arguments, it will assume that the test has failed
    and will print the arguments with the error message on the screen. */
    it('should add todo and dispatch ADD_TODO', (done)=>{
        //Create an empty Mock Store
        const store = createStore({});
        //The text with which to call startAddTodo action
        const todoText = 'Something to do';
        //Call startAddTodo and once it completes successfully, make neccessary assertions 
        store.dispatch(actions.startAddTodo(todoText))
        .then(()=>{
            //Get all actions that were dispatched in the mock store
            const dispatchedActions = store.getActions();
            expect(dispatchedActions[0].type).toEqual('ADD_TODO');

            expect(dispatchedActions[0].todo.text).toEqual(todoText);
            done();
        })
        .catch(done);
    });

    it('should generate add todos action', ()=>{
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

        var res = actions.addTodos(todos);
        
        expect(res).toEqual(action);
    });

    it('should generate toggle show completed action', ()=>{
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED',
        };

        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });
    
    it('should generate update todo action', ()=>{
        var id = 1;
        var updates = {
            completed: true,
            completedAt: 125
        };
        
        var action = {
            type: 'UPDATE_TODO',
            id,
            updates
        };

        var res = actions.updateTodo(id, updates);

        expect(res).toEqual(action);
    });
});

describe('Firebase Actions',()=>{
    
    var testTodoRef = firebaseRef.child('todos').push();
    beforeEach((done)=>{
        testTodoRef.set({
            text:'Something to do',
            completed: false,
            createdAt: 2345343
        }).then(()=>done());
    });

    afterEach((done)=>{
        testTodoRef.remove().then(()=>done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done)=>{
        const store = createStore({});
        const action = actions.startToggleTodo(testTodoRef.key, true);

        store.dispatch(action).then(()=>{
            const mockActions = store.getActions();
            
             expect(mockActions[0]).toInclude({
                type: 'UPDATE_TODO',
                id: testTodoRef.key
            });

            expect(mockActions[0].updates).toInclude({
                completed: true
            }); 
           expect(mockActions[0].updates.completedAt).toExist(); 


            done();
        }).catch(done);
    });
});