import firebase from 'firebase';

try{
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
}catch(e){
    
}

export var firebaseRef = firebase.database().ref();
//The reason for exporting default is when someone imports our file, one also imports the library
export default firebase;