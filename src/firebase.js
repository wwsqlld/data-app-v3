import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyA85Nis4X3-wIzPm1DckVXW4wrKnmQ0Y5o",
  authDomain: "data-app-v2.firebaseapp.com",
  projectId: "data-app-v2",
  storageBucket: "data-app-v2.appspot.com",
  messagingSenderId: "298138127035",
  appId: "1:298138127035:web:d737480efef600305ab79e",
  measurementId: "G-2DE57ZJTJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
