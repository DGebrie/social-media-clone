// import "@firebase/firestore";
// import firebase from "@firebase/app";
// import "firebase/firestore";
// import firebase from "firebase";
import firebase from "firebase/compat";
// import { initializeApp } from "@firebase/app";
// import { getFirestore } from "firebase/firestore/lite";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDK8LDNdpHA_0UD8RXqJwFDTWr4ujkjc7Q",
  authDomain: "social-media-12b62.firebaseapp.com",
  databaseURL: "https://social-media-12b62-default-rtdb.firebaseio.com",
  projectId: "social-media-12b62",
  storageBucket: "social-media-12b62.appspot.com",
  messagingSenderId: "566776147719",
  appId: "1:566776147719:web:c65bba278cff7446965fa2",
  measurementId: "G-DFP5BQK20P",
});

const db = firebaseApp.firestore();
// getFirestore(firebaseApp);
const auth = firebase.auth();
// const auth = getAuth();
const storage = firebase.storage();
// const storage = getStorage(firebaseApp);

export { db, auth, storage };
