 /* Since these are explicitly
 loaded dependencies in package.json, we dont need to include the full path */
 var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');

var TodoApp = require('TodoApp');
var TodoAPI = require('TodoAPI');
var store = require('store').configure();
var actions = require('actions');

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
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);

//Experiment with spread operator
 /* var objOne= {
   name: 'Debanjan',
   location: 'Bangalore'
 };

var objTwo= {
   age: '30',
   ...objOne
 };

console.log(objTwo);

var person = ['Andrew', 25];
var personTwo = ['Jen',29];

var printGreeting = (name, age)=>{
    console.log("Hi "+name+", you are "+age+" years old.");
}
printGreeting(...person);
printGreeting(...personTwo);

var names=['Mike','Ben'];
var final=['Andrew'];
var final=['Andrew',...names];
final.forEach((name)=>{
    console.log("Hi "+name);
}); */


/* var todosFireB = {
	"-LYwY1Ijcw7Ob98J1IuT": {
		"completed":true,
		"text":"Do Something",
		"createdAt":1550425268,
		"completedAt":null,
		"isCompleted":1550425273
	}
};

let todos = [];
var todoKeys = Object.keys(todosFireB);
for(let todoKey of todoKeys){
  debugger;
  let todoFireB = todosFireB[todoKey];
  todos = [
    ...todos,
    {
      ...todoFireB,
      "id": todoKey
    }
  ]
}

console.log("Todos", todos); */