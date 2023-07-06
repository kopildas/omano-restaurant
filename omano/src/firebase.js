// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChy0Z_BtJP_9Bc0sWUuwzVqxuI9Dpglas",
  authDomain: "omano-df188.firebaseapp.com",
  projectId: "omano-df188",
  storageBucket: "omano-df188.appspot.com",
  messagingSenderId: "216682965254",
  appId: "1:216682965254:web:52874618ffefd456751687"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();