
// import firebase from "@firebase";
// import {initializeApp} from "firebase/app"

// const firebaseConfig = {
//     apiKey: "AIzaSyA-5Et2GEgGAdPR_4zgo7ftS0aJEdyC3Dw",
//     authDomain: "whats-app-cl-3944a.firebaseapp.com",
//     projectId: "whats-app-cl-3944a",
//     storageBucket: "whats-app-cl-3944a.appspot.com",
//     messagingSenderId: "905327416571",
//     appId: "1:905327416571:web:5ccc901eea898e31714c5e",
//     measurementId: "G-50NXRLHC7H"
//   };

//   const firebaseapp =  firebase.initialzeApp(firebaseConfig)
//   const db = firebaseapp.firestore();
//   const auth = firebase.auth();
//   const provider  = new firebase.auth.GoogleAuthProvider();

//   export{ auth , provider};
//   export default db;


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth , signInWithPopup} from "firebase/auth";

import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-5Et2GEgGAdPR_4zgo7ftS0aJEdyC3Dw",
  authDomain: "whats-app-cl-3944a.firebaseapp.com",
  databaseURL: "https://whats-app-cl-3944a-default-rtdb.firebaseio.com",
  projectId: "whats-app-cl-3944a",
  storageBucket: "whats-app-cl-3944a.appspot.com",
  messagingSenderId: "905327416571",
  appId: "1:905327416571:web:5ccc901eea898e31714c5e",
  measurementId: "G-50NXRLHC7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get a reference to the database service
const database = getDatabase(app);

const auth = getAuth();
// auth.languageCode = 'it';
const signInWithPop = signInWithPopup;
const provider = new GoogleAuthProvider();

export{ auth, provider, signInWithPop};
export default database;