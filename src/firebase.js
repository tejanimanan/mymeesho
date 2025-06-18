// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYF7KsrwGdCCWcZIV0pSOMkUiTntv-ciQ",
  authDomain: "mymeesho-3c855.firebaseapp.com",
  projectId: "mymeesho-3c855",
  databaseURL: "https://mymeesho-3c855-default-rtdb.firebaseio.com",
  storageBucket: "mymeesho-3c855.firebasestorage.app",
  messagingSenderId: "428206703825",
  appId: "1:428206703825:web:544a7ecd38c749cb1171f0",
  measurementId: "G-LB5FR48VZ7"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const analytics = getAnalytics(app);
 export const database = getDatabase(app);   
export { auth };