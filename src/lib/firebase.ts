import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCi6DtkbwoU2lExG2oNzoeE2dHKLHpSsH0",
    authDomain: "shopverse1.firebaseapp.com",
    projectId: "shopverse1",
    storageBucket: "shopverse1.firebasestorage.app",
    messagingSenderId: "737163320706",
    appId: "1:737163320706:web:6dc824d05f6c4823c4c39b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };
