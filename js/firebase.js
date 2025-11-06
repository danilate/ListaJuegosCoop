// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2GO2s462kSBsgEr3qaBi0HFH9g7i8xCY",
  authDomain: "listajuegoscoop.firebaseapp.com",
  databaseURL: "https://listajuegoscoop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "listajuegoscoop",
  storageBucket: "listajuegoscoop.firebasestorage.app",
  messagingSenderId: "9049833423",
  appId: "1:9049833423:web:e0295ff02868466187dcba",
  measurementId: "G-EGFJV9E905"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, onValue };