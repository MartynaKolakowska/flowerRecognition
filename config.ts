import * as Firebase from "firebase";
import "firebase/firebase-app";
import "firebase/firebase-storage";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDZzQ6NaokuEchdbI4peckwJAWuJoAC8Nc",
  authDomain: "flowerrecognition-1c6fa.firebaseapp.com",
  databaseURL: "https://flowerrecognition-1c6fa.firebaseio.com",
  projectId: "flowerrecognition-1c6fa",
  storageBucket: "flowerrecognition-1c6fa.appspot.com",
  messagingSenderId: "642049652780",
  appId: "1:642049652780:web:cb58afb1ebb426a1e9f989",
  measurementId: "G-SMP21QKZK5"
};
export const firebase = Firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const flowerImage = require("./assets/flower.png");
