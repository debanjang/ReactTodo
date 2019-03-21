import moment from 'moment';
//var moment = require('moment');

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
                action.todo
            ];
            
        case 'UPDATE_TODO':
            var updatedTodos = state.map((todo)=>{
                if(todo.id === action.id){
                    // Two spread operators mean that any matching attrs 
                    //in the todo gets updated with action.updates
                    return {
                        ...todo,
                        ...action.updates
                    };
                }else{
                    return todo;
                }
            });
            return updatedTodos;

        case 'ADD_TODOS':
            return [
                ...state,
                ...action.todos
            ];

        default:
        return state;
    }
};