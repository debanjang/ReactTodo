import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCiKxfVQwlIIMJgJ227RGQS6921bczxjts",
    authDomain: "debanjan-todo-app.firebaseapp.com",
    databaseURL: "https://debanjan-todo-app.firebaseio.com",
    projectId: "debanjan-todo-app",
    storageBucket: "debanjan-todo-app.appspot.com",
messagingSenderId: "1046433510172"
};
firebase.initializeApp(config);

var rootRef = firebase.database().ref();

//Set data to the root ref
rootRef.set({
    app: {
        name: 'Todo App',
        version: '1.0.0'
    },
    isRunning: true,
    user: {
        name: 'Debanjan',
        age: 30
    }    
}).then(()=>{
    console.log('First Set worked');
},(e)=>{
    console.log('First Set failed');
});


//--------------------------------SET------------------------------------

//replace the data at app reference point inside the root ref using child('app')
/* rootRef.child('app').set({
      name: 'Todo Application'
    }).then(()=>{
        console.log('Second Set worked')  
    },(e)=>{
        console.log('Second Set failed');
    }); */
    
//--------------------------------UPDATE------------------------------------
//update the data from rootRef, for nested data like app and user, use multi-path update
/* rootRef.update({
    isRunning: false,
    'app/name': 'Todo Application',
    'user/name': 'Debal'
}).then(()=>{
console.log('Update Worked!')
},(e)=>{
console.log('Update Failed!')
}); */

//use child refs to update the app and user properties
/* rootRef.child('app').update({
    name: 'Todo Application'
}).then(()=>{
console.log('Update Worked!');
}, (e)=>{
console.log('Update Failed!');
});

rootRef.child('user').update({
    name:'Debal'
}).then(()=>{
console.log('Update Worked!');
}, (e)=>{
console.log('Update Failed!');
}); */


//--------------------------------REMOVE------------------------------------

//use child refs with multi path notation to remove user age. used for Nested
//rootRef.child('user/age').remove();

//use child ref to remove isRunning
/* rootRef.child('isRunning').remove();

//Update to null to remove a particular property
rootRef.child('user').update({
age: null
}).then(()=>{
console.log('Remove Worked!')
}, (e)=>{
console.log('Remove Failed!')
});
*/

//--------------------------------FETCH------------------------------------

//once is called only once when the value is first requested for. Used only for values which do not change
//like fetching the user profile on login
/* rootRef.child('user').once('value').then((snapshot)=>{
    console.log('Value fetched successfully', snapshot.val());
},(e)=>{
    console.log('Value could not be fetched successfully', e);
});

var logData = (snapshot)=>{
    console.log('On listening to changes on value on the user ref', snapshot.val());
};

//on is called once when the value is first requested for and then subsequently for each update at this ref.
rootRef.child('user').on('value', logData);

//Turn off the on listener on value event at the user reference for all callbacks.
//rootRef.child('user').off();

//Turn off the on listener on value event at the user reference for this particular callback.
rootRef.child('user').off('value',logData);

//Update values at the user reference. This fires the value event and the on listener is called.
rootRef.child('user').update({
    name: 'Soumadeep'
});

//Update values at a different reference. This does not fire the value event on the user ref.
rootRef.child('app').update({
    name: 'Todo Application'
}); */

//--------------------------------ARRAY------------------------------------
var todosRef = rootRef.child('todos');

var keys=[];
todosRef.on('child_added', (snapshot)=>{
    keys.push(snapshot.key);
    console.log('child_added ', snapshot.key, snapshot.val());
});

todosRef.on('child_changed', (snapshot)=>{
    console.log('child_changed ', snapshot.key, snapshot.val());
});

todosRef.on('child_removed', (snapshot)=>{
    console.log('child_removed ', snapshot.key, snapshot.val());
});

//One way to push items into the todos array.
/* var newTodosRef = todosRef.push();
newTodosRef.set({
    text: 'Walk the dog'
}); */

//Another way to push items into the todos array. Shortcut for calling set after push.
todosRef.push({
    text: 'Walk the dog'
});

var newRef = todosRef.push({
    text: 'Finish as many React videos as possible'
});

console.log('New Ref ',newRef.key);

//Update the first todo item
todosRef.child(keys[0]).update({
    text: 'Feed the dog'
});

//Remove the second todo item
todosRef.child(keys[1]).remove();
