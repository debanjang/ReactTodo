var $ = require('jquery');

module.exports = {
    
    //Uncomment to have todos being stored to and fetched from local storage
    /* setTodos: function(todos){
        if($.isArray(todos)){
            localStorage.setItem('todos',JSON.stringify(todos));
        }
    },

    getTodos: function(){
        var stringTodos = localStorage.getItem('todos');
        var todos = [];

        try{
            todos = JSON.parse(stringTodos);
        }catch(e){
            console.log("Error While Parsing: "+e);
        }
        
        todos = $.isArray(todos)?todos:[];
        return todos;
    }, */

    filterTodos: function(todos, showCompleted, searchText){
        var filteredTodos = todos;
        var searchString = searchText.toLowerCase();

        /* Filter by completed and showCompleted. 
        Completed todos should only show up when show completed is true */
        filteredTodos = filteredTodos.filter((todo)=>{
            //if we return false from this callback, the item will be filtered out of the list
            return !todo.completed || showCompleted;
        });

        //Filter by searchString
        filteredTodos = filteredTodos.filter((todo)=>{
            return searchString===0 || todo.text.toLowerCase().indexOf(searchString)>=0;
        });

        //Sort items by completion status. Incomplete todos should show up first in the list
        //Sort modifies the existing array. Therefore there is no need to return the list at the end
        //Ascending order by default. If a>b, a should appear after b
        //return 1: a>b
        //return -1: b>a
        //return 0: a=b
        filteredTodos.sort((a,b)=>{
            if(!a.completed && b.completed){
                //b should appear after a
                return -1;
            }else if(a.completed && !b.completed){
                //a should appear after b
                return 1;
            }else{
                return 0;
            }
        });
        return filteredTodos;
    },
}