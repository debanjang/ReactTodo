var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI',()=>{
    beforeEach(()=>{
        localStorage.removeItem('todos');
    });
    
    it('should exist',()=>{
        expect(TodoAPI).toExist();
    });

    describe('setTodos',()=>{
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
    });

    describe('getTodos',()=>{
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
    });
});