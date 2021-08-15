import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth";
import "firebase/storage"
var firebaseConfig = {
    apiKey: "AIzaSyBCLobo7h1FwOWDEsNLtZbb6XEPX4IL78I",
    authDomain: "reels-4d5be.firebaseapp.com",
    projectId: "reels-4d5be",
    storageBucket: "reels-4d5be.appspot.com",
    messagingSenderId: "545050532008",
    appId: "1:545050532008:web:83c00bac25f54f0f448a9d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const firestore=firebase.firestore()
  export const auth=firebase.auth();
  export const storage=firebase.storage();
  let provider=new firebase.auth.GoogleAuthProvider();

  export const signInWtihGoogle=()=>auth.signInWithPopup(provider);

 export default firebase;
