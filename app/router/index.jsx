import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import firebase from 'app/firebase/';
import TodoApp from 'TodoApp';
import Login from 'Login';
/*
 Router middleware function that lets us execute some code before a route
 has been called
*/
var requireLogin = function(nextState, replace, next){
    //You can only visit the todos page if you are logged in
    if(!firebase.auth().currentUser){
      replace("/");
    }
    //when all is done, call next
    next();
  };
  
  var requireLogout  = function(nextState, replace, next){
    //You can only visit the login page if you are logged out
    if(firebase.auth().currentUser){
      replace("/todos");
    }
    //when all is done, call next  
    next();
  };

export default(
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={Login} onEnter={requireLogout}/>
            <Route path="/todos" component={TodoApp} onEnter={requireLogin}/>
        </Route>
    </Router>
);