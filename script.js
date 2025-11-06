import { db, ref, set, onValue } from './js/firebase.js';

// Función para actualizar el estado en Firebase
function updateGameStatus(gameId, newStatus) {
  const gameRef = ref(db, 'games/' + gameId);
    set(gameRef, {
        status: newStatus,
        lastUpdate: new Date().toISOString()
    });
}

// Función para cargar los estados desde Firebase
function loadGameStates() {
    const gamesRef = ref(db, 'games');
    onValue(gamesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
     // Actualizar todos los selectores con los estados guardados
     document.querySelectorAll('.status-select').forEach(select => {
  const gameId = select.id;
 if (data[gameId]) {
  select.value = data[gameId].status;
   select.closest('.game-card').setAttribute('data-status', data[gameId].status);
     }
            });
     }
    });
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
 // Cargar estados iniciales
loadGameStates();
    
    // Configurar los selectores de estado
    document.querySelectorAll('.status-select').forEach(select => {
    select.addEventListener('change', (event) => {
            const gameId = event.target.id;
            const newStatus = event.target.value;
     const card = event.target.closest('.game-card');
            
 // Actualizar el estado visual
        card.setAttribute('data-status', newStatus);
            
      // Guardar en Firebase
  updateGameStatus(gameId, newStatus);
   });
    });
});
