// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getDatabase, ref, set, push, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2GO2s462kSBsgEr3qaBi0HFH9g7i8xCY",
    authDomain: "listajuegoscoop.firebaseapp.com",
    databaseURL: "https://listajuegoscoop-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "listajuegoscoop",
    storageBucket: "listajuegoscoop.appspot.com",
    messagingSenderId: "9049833423",
    appId: "1:9049833423:web:e0295ff02868466187dcba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Función para guardar un juego
export async function saveGame(gameData) {
    try {
        const gameRef = ref(db, `games/${gameData.id}`);
    await set(gameRef, {
         ...gameData,
        lastModified: new Date().toISOString()
     });
        return gameData.id;
    } catch (error) {
        console.error('Error saving game:', error);
        throw error;
    }
}

// Función para eliminar un juego
export async function deleteGame(gameId) {
    try {
        const gameRef = ref(db, `games/${gameId}`);
        await remove(gameRef);
     return true;
    } catch (error) {
        console.error('Error deleting game:', error);
        throw error;
    }
}

// Función para actualizar el estado de un juego
export async function updateGameStatus(gameId, newStatus) {
    try {
        const gameRef = ref(db, `games/${gameId}`);
  await update(gameRef, {
    status: newStatus,
          lastModified: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating game status:', error);
        throw error;
    }
}

// Función para obtener todos los juegos
export function onGamesUpdate(callback) {
    const gamesRef = ref(db, 'games');
    console.log('Setting up Firebase listener...'); // Debug log
    onValue(gamesRef, (snapshot) => {
        console.log('Firebase data received:', snapshot.val()); // Debug log
      const data = snapshot.val();
        callback(data);
    });
}

// Exportar todo lo necesario
export { db, ref, set, push, onValue, remove, update };