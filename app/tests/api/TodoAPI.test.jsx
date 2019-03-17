var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI',()=>{
    beforeEach(()=>{
        localStorage.removeItem('todos');
    });
    
    it('should exist',()=>{
        expect(TodoAPI).toExist();
    });

    /* describe('setTodos',()=>{
        it('should set valid todos array',()=>{
            var todos = [{
                id: 21,
                text: 'Test text',
                completed: false
            }];

            TodoAPI.setTodos(todos);
            var actualTodos = JSON.parse(localStorage.getItem('todos'));
            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array',()=>{
            var invalidTodos = {text:"invalid test"};

            TodoAPI.setTodos(invalidTodos);
            var actualTodos = JSON.parse(localStorage.getItem('todos'));
            expect(actualTodos).toBe(null);
        });
    }); */

   /*  describe('getTodos',()=>{
        it('should retrieve todos when valid todos are present in localStorage',()=>{
            var todos = [{
                id:24,
                text: 'Test Text',
                completed: false
            }];
            localStorage.setItem('todos', JSON.stringify(todos));
            var actualTodos = TodoAPI.getTodos();

            expect(actualTodos).toEqual(todos);
        });

        it('should return empty array when invalid todos are present in localStorage',()=>{
            var invalidTodos={text:'Invalid Text'};

            localStorage.setItem('todos', JSON.stringify(invalidTodos));
            var actualTodos = TodoAPI.getTodos();

            expect(actualTodos).toNotEqual(invalidTodos);
            expect(actualTodos).toEqual([]);
        });
    }); */

    describe('filterTodos',()=>{

        var todos = [{
            id:1,
            text: 'Test Text',
            completed: true
        },{
            id:2,
            text: 'Another Text',
            completed: true
        },{
            id:3,
            text: 'Test Text',
            completed: false
        }];

        it('should return all todos if showCompleted is true',()=>{
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');

            expect(filteredTodos.length).toBe(3);
        });

        it('should return only incomplete todos if showCompleted is false',()=>{
            var filteredTodos = TodoAPI.filterTodos(todos, false, '');

            expect(filteredTodos.length).toBe(1);
        });

        it('should  sort by completed status',()=>{
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');

            expect(filteredTodos[0].completed).toBeFalsy();
        });

        it('should filter todo items by non empty search text',()=>{
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'test');

            expect(filteredTodos.length).toBe(2);
        });

        it('should return all items when search text is empty',()=>{
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');

            expect(filteredTodos.length).toBe(3);
        });

    });
});