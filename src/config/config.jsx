import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFCSqxP1qtrozONDjP1ZV8WZQN8FjORiE",
  authDomain: "enactus-b6248.firebaseapp.com",
  databaseURL: "https://enactus-b6248-default-rtdb.firebaseio.com",
  projectId: "enactus-b6248",
  storageBucket: "enactus-b6248.appspot.com",
  messagingSenderId: "409974764581",
  appId: "1:409974764581:web:b72155d5fa5295f981bbcc",
  measurementId: "G-W0GFELYWR9",
};

firebase.initializeApp(firebaseConfig);

const initializeAuthentication = () => {
  firebase.initializeApp(firebaseConfig);
};

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage, initializeAuthentication };
