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
    };
};

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

export var updateTodo = (id, updates) =>{
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    };
};

export var startToggleTodo = (id, completed)=>{
    return(dispatch, getState)=>{
        //es5 way to concatenate the value of id to todos
        //var todosRef = firebaseRef.child('todos/'+id);

        //es6 way to concatenate the value of id to todos. Template Strings
        var todoRef = firebaseRef.child(`todos/${id}`);
        
        var updates = {
            completed,
            completedAt: completed ? moment().unix():null
        };

        //add to the redux store on sucessful updation of Firebase
        return todoRef.update(updates).then(()=>{
            dispatch(updateTodo(id, updates));
        });
    };
};