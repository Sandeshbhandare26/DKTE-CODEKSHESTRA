import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where, serverTimestamp, deleteDoc, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCd2q90Db1Rf6H4Hy_mdAXJoG8I6vt3jGY",
  authDomain: "ckathon-4eff9.firebaseapp.com",
  projectId: "ckathon-4eff9",
  storageBucket: "ckathon-4eff9.firebasestorage.app",
  messagingSenderId: "81199485968",
  appId: "1:81199485968:web:8b0e1586318a58139f2695",
  measurementId: "G-3B5GL0V842"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, db, analytics, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, googleProvider, signInWithPopup, updateProfile, collection, addDoc, getDocs, query, orderBy, where, serverTimestamp, deleteDoc, doc, setDoc, getDoc };
