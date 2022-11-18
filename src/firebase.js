
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVIKpJrd7x9fQ8OC_ZmxVsSK-HXMK-iBQ",
  authDomain: "chat-application-9ef0f.firebaseapp.com",
  projectId: "chat-application-9ef0f",
  storageBucket: "chat-application-9ef0f.appspot.com",
  messagingSenderId: "404976805448",
  appId: "1:404976805448:web:2f2fb565087e483e72da7d",
  measurementId: "G-03HPST60B9"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app); 
export const auth = getAuth(); 
export const db = getFirestore();  
 export const storage = getStorage();