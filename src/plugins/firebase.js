import "firebase/auth";

import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1w0ay3quoj1oxnkUFY4OTGc6hbMSbq30",
    authDomain: "shop-c82df.firebaseapp.com",
    databaseURL: "https://shop-c82df-default-rtdb.firebaseio.com",
    projectId: "shop-c82df",
    storageBucket: "shop-c82df.appspot.com",
    messagingSenderId: "174942809665",
    appId: "1:174942809665:web:6e1b0a4aff36a78fd460c0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.database("https://shop-c82df-default-rtdb.firebaseio.com/");
//const userId = firebase.auth().currentUser.uid
export default db;