
import { getAuth } from "@firebase/auth";
// import { initializeApp } from "firebase/app";
import * as firebase from 'firebase/app'
import { getFirestore } from "firebase/firestore";


const app = firebase.initializeApp({
    apiKey: "AIzaSyAXlJUBXLtkXVzC6QUpomG-PrLYLzuue4w",
    authDomain: "note-app-73635.firebaseapp.com",
    projectId: "note-app-73635",
    storageBucket: "note-app-73635.appspot.com",
    messagingSenderId: "623140033352",
    appId: "1:623140033352:web:ce384613a26979f8ee197d",
    measurementId: "G-MH9YJ570KS"
  
});

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
