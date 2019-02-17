import moment from 'moment';

import firebase, {firebaseRef} from 'app/firebase/';

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export var toggleShowCompleted = ()=>{
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export var addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    };
};

export var startAddTodo = (text) =>{
    return (dispatch, getState)=>{
        var todo = {
                completed: false,
                text,
                createdAt: moment().unix(),
                completedAt: null
        };
        //add to firebase
        var todoRef = firebaseRef.child('todos').push(todo);

        //Once todo is added to firebase, add to state
        return todoRef.then(()=>{
            dispatch(addTodo({
                ...todo,
                id: todoRef.key
            }));
        });
    }
}

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

export var toggleTodo = (id) =>{
    return {
        type: 'TOGGLE_TODO',
        id
    }
}