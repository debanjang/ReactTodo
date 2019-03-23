 /* Since these are explicitly
 loaded dependencies in package.json, we dont need to include the full path */
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Router, Route, IndexRoute, hashHistory} = require('react-router');

import TodoApp from 'TodoApp';
var TodoAPI = require('TodoAPI');
var store = require('store').configure();
var actions = require('actions');
import Login from 'Login';

//Fetch the todos array from firebase and set it to the state
store.dispatch(actions.startAddTodos());

//Fire up foundation
$('document').foundation();

//Load custom styles
require('style!css!sass!applicationStyles');

//ReactDOM.render is the starting point of the application. render to the app container
//Provider provides access to the store for all child components inside the Provider tag in ReactDom.render()
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={Login}/>
        <Route path="/todos" component={TodoApp}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
  );

  //uncomment the next line and comment the ReactDOM.render to have playground files be executed
  //import './playground/firebase/index';
  
  //Uncomment to have todos stored in local storage
  /* store.subscribe(()=>{
    var state = store.getState();
    //everytime the state changes, set the new todos in the localStorage
    TodoAPI.setTodos(state.todos);
    console.log('New State', state);
  }); */
  
  //get the initial todos from the local storage
  //var initialTodos = TodoAPI.getTodos();
  //dispatch an action to set the initial todos from local storage into the state
  //store.dispatch(actions.addTodos(initialTodos));
