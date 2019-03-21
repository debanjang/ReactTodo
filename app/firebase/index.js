import firebase from 'firebase';


try{
    // Initialize Firebase with process.env variables from webpack at runtime
    var config = {
        apiKey: webpack.process.env.API_KEY,
        authDomain: webpack.process.env.AUTH_DOMAIN,
        databaseURL: webpack.process.env.DATABASE_URL,
        projectId: webpack.process.env.PROJECT_ID,
        storageBucket: webpack.process.env.STORAGE_BUCKET,
        messagingSenderId: webpack.process.env.MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);
}catch(e){
    
}

export var firebaseRef = firebase.database().ref();
//The reason for exporting default is when someone imports our file, one also imports the library
export default firebase;