// Variables globales
let gameData = null;

// Función para cargar los datos del JSON
async function loadGameData() {
    try {
        const response = await fetch('data/gameStatus.json');
    if (!response.ok) {
         throw new Error('No se pudo cargar los datos');
        }
      gameData = await response.json();
        return gameData;
    } catch (error) {
        console.error('Error cargando datos:', error);
    // Si hay error, crear estructura básica
        return {
    games: [],
            lastUpdate: new Date().toISOString()
        };
    }
}

// Función para obtener o crear datos de un juego
function getOrCreateGameData(gameId) {
    let game = gameData.games.find(g => g.gameId === gameId);
    if (!game) {
        game = {
   gameId: gameId,
  status: 'pendiente',
    votes: {
       pendiente: 0,
          disfrutado: 0,
         rechazado: 0
       }
        };
gameData.games.push(game);
  }
    return game;
}

// Función para actualizar el estado visual de una tarjeta
function updateCardStatus(gameId, status, votes) {
  const select = document.getElementById(gameId);
    if (!select) return;

  select.value = status;
    const card = select.closest('.game-card');
    if (card) {
        card.setAttribute('data-status', status);
        
      // Actualizar o crear el contador de votos
    let votesContainer = card.querySelector('.votes-container');
  if (!votesContainer) {
        votesContainer = document.createElement('div');
      votesContainer.className = 'votes-container';
  select.parentNode.appendChild(votesContainer);
        }
        
      votesContainer.innerHTML = `
            <span class="vote-count" title="Pendiente">
   <i class="fas fa-clock"></i> ${votes.pendiente}
        </span>
         <span class="vote-count" title="Disfrutado">
      <i class="fas fa-heart"></i> ${votes.disfrutado}
      </span>
       <span class="vote-count" title="Rechazado">
       <i class="fas fa-times"></i> ${votes.rechazado}
      </span>
     `;
    }
}

// Función para manejar el cambio de estado
function handleStatusChange(event) {
    const gameId = event.target.id;
    const status = event.target.value;
    const game = getOrCreateGameData(gameId);
    
    // Actualizar votos
    game.votes[status]++;
    game.status = status;
    
    // Actualizar visualización
    updateCardStatus(gameId, status, game.votes);
    
 // Aquí podrías implementar lógica para enviar PR a GitHub
    console.log(`Estado actualizado para ${gameId}: ${status}`);
    console.log('Para contribuir con tu voto, crea un PR en GitHub');
}

// Función para configurar los event listeners
function setupEventListeners() {
 const selects = document.querySelectorAll('.status-select');
    selects.forEach(select => {
        select.addEventListener('change', handleStatusChange);
    });
}

// Función para cargar todos los estados
async function loadAllGameStates() {
    const data = await loadGameData();
    data.games.forEach(game => {
        updateCardStatus(game.gameId, game.status, game.votes);
    });
}

// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    loadAllGameStates();
    setupEventListeners();
});
