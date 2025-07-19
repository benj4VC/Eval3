// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_MpiNdFwYJDwss9--40-wWYDaEYtk9uk",
  authDomain: "eva4-a0435.firebaseapp.com",
  projectId: "eva4-a0435",
  storageBucket: "eva4-a0435.firebasestorage.app",
  messagingSenderId: "860516879014",
  appId: "1:860516879014:web:441557f1e087cda8eb4267",
  measurementId: "G-JSR6BNDJ55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

console.log('Firebase conectado correctamente:', app.name)
