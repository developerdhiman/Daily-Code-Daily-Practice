// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsSa3n1184gqd_-VXo8sQNUwDbqX-EHzA",
  authDomain: "daily-code-daily-practice.firebaseapp.com",
  projectId: "daily-code-daily-practice",
  storageBucket: "daily-code-daily-practice.firebasestorage.app",
  messagingSenderId: "915594995004",
  appId: "1:915594995004:web:71fbff0842639d5d87aa39",
  measurementId: "G-B424900K1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;