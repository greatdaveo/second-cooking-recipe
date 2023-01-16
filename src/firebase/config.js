import firebase from "firebase/app";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrZBqWTjYF0sOL5tyO9QRO659NXN2IVdE",
  authDomain: "cooking-recipe-80bb5.firebaseapp.com",
  projectId: "cooking-recipe-80bb5",
  storageBucket: "cooking-recipe-80bb5.appspot.com",
  messagingSenderId: "125093759173",
  appId: "1:125093759173:web:e6557ed6deb857007888ac",
  measurementId: "G-Y1QGSZ93Z5",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
