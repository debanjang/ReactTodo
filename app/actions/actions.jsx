import moment from 'moment';

import firebase, {firebaseRef, githubProvider} from 'app/firebase/';

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
        //fetch the uid from the redux store. getState returns the store's whole state.
        //ie. searchText, showCompleted, todos and auth
        var uid = getState().auth.uid;
        //add to firebase
        var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);
        
        //Once todo is added to firebase, add to state. 
        //Return the promise for chaining in test files
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

export var startAddTodos = ()=>{
    return (dispatch, getState)=>{
        //fetch the uid from the redux store. getState returns the store's whole state.
        //ie. searchText, showCompleted, todos and auth
        var uid = getState().auth.uid;

        //Fetch todos from FireBase
        //Using once() on value event for first time load data
        //Return the promise for chaining in test files
        return firebaseRef.child(`users/${uid}/todos`).once('value').then((snapshot)=>{
            let todos = snapshot.val() || {};
            let parsedTodos = [];
            
            var todoKeys =Object.keys(todos);
            todoKeys.forEach(todoKey=>{
                let todo = todos[todoKey];
                parsedTodos = [
                    ...parsedTodos,
                    {
                        ...todo,
                        "id": todoKey
                    }
                ]
            });
            
            dispatch(addTodos(parsedTodos));
        });
        
        
    }
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
        
        //fetch the uid from the redux store. getState returns the store's whole state.
        //ie. searchText, showCompleted, todos and auth
        var uid = getState().auth.uid;
        
        //es5 way to concatenate the value of id to todos
        //var todosRef = firebaseRef.child('todos/'+id);
        
        //es6 way to concatenate the value of id to todos. Template Strings
        var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
        
        var updates = {
            completed,
            completedAt: completed ? moment().unix():null
        };
        
        //add to the redux store on sucessful updation of Firebase
        //Return the promise for chaining in test files
        return todoRef.update(updates).then(()=>{
            dispatch(updateTodo(id, updates));
        });
    };
};

//Log in and Log Out
//Does not affect firebase, on dispatch only affects the store
export var login = (uid)=>{
    return{
        type: 'LOGIN',
        uid
    };
};

export var startLogin = ()=>{
    return (dispatch, getState)=>{
        return firebase.auth().signInWithPopup(githubProvider).then((result)=>{
            console.log('Auth worked!', result);
        }, (error)=>{
            console.log('Auth Failed!', error);
        });
    };
};

//Does not affect firebase, on dispatch only affects the store
export var logout = ()=>{
    return {
        type: 'LOGOUT'
    };
};

export var startLogout = ()=>{
    return (dispatch, getState)=>{
        return firebase.auth().signOut().then(()=>{
            console.log('Logged Out!');
        });
    };
};
