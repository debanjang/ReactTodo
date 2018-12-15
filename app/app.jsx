 /* Since these are explicitly
 loaded dependencies in package.json, we dont need to include the full path */
 var React = require('react');
var {Router, Route, IndexRoute, hashHistory} = require('react-router');
var ReactDOM = require('react-dom');
var TodoApp = require('TodoApp');


//Fire up foundation
$('document').foundation();

//Load custom styles
require('style!css!sass!applicationStyles');

// RaectDOM.render is the starting point of the application. render to the app container
ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);

//Experiment with spread operator
// var objOne= {
//   name: 'Debanjan',
//   location: 'Bangalore'
// };
//
// var objTwo= {
//   age: '30',
//   ...objOne
// };
//
// console.log(objTwo);
