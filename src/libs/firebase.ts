import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBEGJ-lcLlA7nSWoHcdFLDeIuJGdpw-F0w",
    authDomain: "revue-f8bbd.firebaseapp.com",
    projectId: "revue-f8bbd",
    storageBucket: "revue-f8bbd.appspot.com",
    messagingSenderId: "274875335081",
    appId: "1:274875335081:web:9a21225ef128017a1104b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app)

export { auth, storage, db };