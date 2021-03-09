import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCet7TzgUgRe91p63_4LR0zX9bcX3-5LnA",
  authDomain: "podexpress-dc12a.firebaseapp.com",
  databaseURL: "https://podexpress-dc12a-default-rtdb.firebaseio.com",
  projectId: "podexpress-dc12a",
  storageBucket: "podexpress-dc12a.appspot.com",
  messagingSenderId: "887110287738",
  appId: "1:887110287738:web:e7835ea0b56785c25256c3",
  measurementId: "G-10ZHMSRLMX"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();