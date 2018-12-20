var $ = require('jquery');

module.exports = {
    setTodos: function(todos){
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
    }
}