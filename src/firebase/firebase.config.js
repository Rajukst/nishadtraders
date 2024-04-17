// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDD0HeRcs0RFl2kErjLRKPZ2NErQa6SKWw",
    authDomain: "nishad-telecom-a1356.firebaseapp.com",
    projectId: "nishad-telecom-a1356",
    storageBucket: "nishad-telecom-a1356.appspot.com",
    messagingSenderId: "558966455912",
    appId: "1:558966455912:web:54550888f049b69424c5dd"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;
