import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC3ZxUOI4mmQnfNwj4XSdc2ThK7MlLYhlw",
    authDomain: "auth--facebook-1cdd9.firebaseapp.com",
    projectId: "auth--facebook-1cdd9",
    storageBucket: "auth--facebook-1cdd9.appspot.com",
    messagingSenderId: "257332822810",
    appId: "1:257332822810:web:9b2d98893563c95c0162a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {firebase, db, auth, storage}