var uuid = require('node-uuid');
var moment = require('moment');

//search text reducer
//___________________________________________
export var searchTextReducer = (state = '', action)=>{
    switch(action.type){
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
};

//show completed reducer
//_____________________________________________
export var showCompletedReducer = (state = false, action)=>{
    switch(action.type){
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
};

//Todos reducer
//________________________________________________
export var todosReducer = (state=[], action)=>{
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: uuid(),
                    completed: false,
                    text: action.text,
                    createdAt: moment().unix(),
                    completedAt: undefined
                }
            ];
        case 'TOGGLE_TODO':
            var updatedTodos = state.map((todo)=>{
                if(todo.id === action.id){
                    var newCompleted = !todo.completed;
                    return {
                        ...todo,
                        completed: newCompleted,
                        completedAt: newCompleted? moment().unix():undefined
                    };
                }else{
                    return todo;
            }
            });
            return updatedTodos;
        default:
            return state;
    }
};