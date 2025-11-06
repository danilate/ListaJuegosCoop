import { db, ref, set, onValue } from './js/firebase.js';

// Elementos del DOM
const gameList = document.getElementById('game-list');
const modal = document.getElementById('addGameModal');
const openModalBtn = document.getElementById('openAddGame');
const closeModalBtn = document.querySelector('.close');
const addGameBtn = document.getElementById('addGameBtn');
const gameUrlInput = document.getElementById('gameUrl');
const urlError = document.getElementById('urlError');

// Función para crear una tarjeta de juego
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-status', game.status);
    
    card.innerHTML = `
        <img src="${game.imageUrl}" alt="${game.title}" class="game-image">
        <div class="card-content">
            <h2>${game.title}</h2>
            <p><i class="${game.icon}"></i> ${game.description}</p>
    <p><i class="fas fa-users"></i> Coop: ${game.players}</p>
    <a href="${game.storeUrl}" target="_blank" class="steam-link">
    <i class="${game.storeType === 'steam' ? 'fab fa-steam' : 'fas fa-gamepad'}"></i> 
      Ver en ${game.storeType === 'steam' ? 'Steam' : 'Tienda'}
    </a>
    <div class="status-container">
       <label for="status-${game.id}"><i class="fas fa-star"></i> Estado:</label>
     <select id="status-${game.id}" class="status-select">
        <option value="pendiente" ${game.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
  <option value="disfrutado" ${game.status === 'disfrutado' ? 'selected' : ''}>Jugado y disfrutado</option>
         <option value="rechazado" ${game.status === 'rechazado' ? 'selected' : ''}>Jugado y rechazado</option>
</select>
        </div>
        </div>
    `;

    // Evento para cambio de estado
    const select = card.querySelector('.status-select');
  select.addEventListener('change', (event) => {
        updateGameStatus(game.id, event.target.value);
    });

    return card;
}

// Función para renderizar todos los juegos
function renderGames(games) {
    gameList.innerHTML = '';
    Object.entries(games)
        .sort(([,a], [,b]) => {
  const statusOrder = { pendiente: 0, disfrutado: 1, rechazado: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
        })
  .forEach(([id, game]) => {
            game.id = id;
          gameList.appendChild(createGameCard(game));
        });
}

// Función para validar URL
function isValidGameUrl(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname === 'store.steampowered.com' || 
      urlObj.hostname === 'store.epicgames.com';
    } catch {
   return false;
 }
}

// Función para extraer información de Steam
async function fetchSteamGameInfo(appId) {
    try {
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
        const data = await response.json();
        
if (data[appId].success) {
 const gameInfo = data[appId].data;
   return {
       title: gameInfo.name,
           description: gameInfo.short_description,
    imageUrl: gameInfo.header_image,
      players: gameInfo.categories
         .filter(cat => cat.id === 38 || cat.id === 9)
     .map(cat => cat.description)
        .join(', '),
          storeUrl: `https://store.steampowered.com/app/${appId}`,
     storeType: 'steam',
      status: 'pendiente',
           icon: 'fas fa-gamepad'
          };
        }
        throw new Error('No se pudo obtener la información del juego');
    } catch (error) {
        console.error('Error obteniendo información del juego:', error);
        return null;
    }
}

// Eventos
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    gameUrlInput.value = '';
    urlError.style.display = 'none';
});

closeModalBtn.addEventListener('click', () => {
 modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Escuchar cambios en la base de datos
const gamesRef = ref(db, 'games');
onValue(gamesRef, (snapshot) => {
    const data = snapshot.val() || {};
    renderGames(data);
});
