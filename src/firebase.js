// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzptiTG0Wh4wI_QeA9fhyOLP17x8wBqxg",
  authDomain: "fb-messenger-96c76.firebaseapp.com",
  projectId: "fb-messenger-96c76",
  storageBucket: "fb-messenger-96c76.appspot.com",
  messagingSenderId: "303788194534",
  appId: "1:303788194534:web:faf3d51640b26a3006d927",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { auth, db };
