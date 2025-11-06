import { onGamesUpdate, updateGameStatus, deleteGame } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
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
            <div class="delete-button" title="Eliminar juego">
 <i class="fas fa-times"></i>
    </div>
            <img src="${game.imageUrl}" alt="${game.title}" class="game-image">
            <div class="card-content">
              <h2>${game.title}</h2>
             <p><i class="${game.icon}"></i> ${game.description}</p>
           <p><i class="fas fa-users"></i> Coop: ${game.players}</p>
         <a href="${game.storeUrl}" target="_blank" class="steam-link">
       <i class="${game.storeType === 'steam' ? 'fab fa-steam' : 'fas fa-gamepad'}"></i> 
        Ver en ${game.storeType === 'steam' ? 'Steam' : game.storeType === 'epic' ? 'Epic Games' : 'Tienda'}
        </a>
      <div class="status-container">
         <label for="status-${game.id}"><i class="fas fa-star"></i> Estado:</label>
       <select id="status-${game.id}" class="status-select">
        <option value="pendiente" ${game.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
        <option value="disfrutado" ${game.status === 'disfrutado' ? 'selected' : ''}>Jugado y disfrutado</option>
        <option value="rechazado" ${game.status === 'rechazado' ? 'selected' : ''}>Jugado y rechazado</option>
      </select>
             </div>
     </div>`;

      // Manejar eliminación de juego
        const deleteBtn = card.querySelector('.delete-button');
   deleteBtn.addEventListener('click', async (event) => {
     event.stopPropagation();
            if (confirm(`¿Estás seguro de que quieres eliminar ${game.title}?`)) {
        try {
      await deleteGame(game.id);
       card.remove();
 } catch (error) {
         console.error('Error eliminando juego:', error);
alert('Error al eliminar el juego');
         }
          }
        });

        // Manejar cambios de estado
 const select = card.querySelector('.status-select');
        select.addEventListener('change', async (event) => {
            try {
     await updateGameStatus(game.id, event.target.value);
        card.setAttribute('data-status', event.target.value);
     } catch (error) {
       console.error('Error updating game status:', error);
  event.target.value = game.status; // Revertir al estado anterior si hay error
  }
        });

        return card;
    }

    // Función para renderizar todos los juegos
    function renderGames(games) {
        if (!games) return;
        
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

    // Escuchar cambios en la base de datos
    onGamesUpdate(renderGames);

    // Event listeners para el modal
    openModalBtn?.addEventListener('click', () => {
        modal.style.display = 'block';
        gameUrlInput.value = '';
        urlError.style.display = 'none';
    });

    closeModalBtn?.addEventListener('click', () => {
      modal.style.display = 'none';
    });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        }
    });
});