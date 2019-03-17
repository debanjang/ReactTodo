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

describe('Test with firebase todos',()=>{
    var todoRef = firebaseRef.child('todos');
    var testTodoRef = firebaseRef.child('todos').push();
    beforeEach((done)=>{
        //remove all exisiting todos
        todoRef.remove().then(()=>{
            //only add new todos once old todos are removed
           //return the promise to chain it. This is why we are able to have the .then() at the end of set
            return testTodoRef.set({
                text:'Something to do',
                completed: false,
                createdAt: 2345343
            });
        })
        .then(()=>done())
        .catch(done);
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

    it('should add todos and dispatch ADD_TODOS action', (done)=>{
        const store = createStore({});
        store.dispatch(actions.startAddTodos()).then(()=>{
            //Array of all actions dispatched since the store was created
            const mockActions = store.getActions();
            //Expect that ADD_TODOS has been dispatched as a result of calling startAddTodos
            expect(mockActions[0]).toInclude({
               type: 'ADD_TODOS' 
            });

            //Expect that the todos with which ADD_TODOS is dispatched is the same that was set in the testTodoRef.
            //ie. length = 1
            expect(mockActions[0].todos.length).toEqual(1);

            //Expect that the todos with which ADD_TODOS is dispatched is the same that was set in the testTodoRef.
            //ie. text is same as what was saved to firebase in beforeEach
            expect(mockActions[0].todos[0]).toInclude({
                text:'Something to do' 
            });

            done();
        }).catch(done);
    });


});