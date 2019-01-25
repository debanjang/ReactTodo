var expect = require('expect');
var actions = require('actions');

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
        var action= {
            type: 'ADD_TODO',
            text: 'Something to do'
        };

        var res = actions.addTodo('Something to do');

        expect(res).toEqual(action);
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
    
    it('should generate toggle todo action', ()=>{
        var action = {
            type: 'TOGGLE_TODO',
            id: 1
        };

        var res = actions.toggleTodo(1);

        expect(res).toEqual(action);
    });
});