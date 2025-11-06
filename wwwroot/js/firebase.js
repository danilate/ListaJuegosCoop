// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getDatabase, ref, set, push, onValue } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js';

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
        // Generar una referencia con el ID del juego
      const gameRef = ref(db, `games/${gameData.id}`);
        // Guardar los datos
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

// Función para actualizar el estado de un juego
export async function updateGameStatus(gameId, newStatus) {
    try {
   const gameRef = ref(db, `games/${gameId}`);
      await set(gameRef, {
      status: newStatus,
            lastModified: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
        console.error('Error updating game status:', error);
        throw error;
    }
}

// Función para obtener todos los juegos
export function onGamesUpdate(callback) {
 const gamesRef = ref(db, 'games');
    onValue(gamesRef, (snapshot) => {
  const data = snapshot.val();
        callback(data);
    });
}

export { db, ref, set, onValue };