import { onGamesUpdate, updateGameStatus, deleteGame, saveGame } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded...'); // Debug log
    const gameList = document.getElementById('game-list');
    const modal = document.getElementById('addGameModal');
    const openModalBtn = document.getElementById('openAddGame');
    const closeModalBtn = document.querySelector('.close');
    const addGameBtn = document.getElementById('addGameBtn');
    const gameUrlInput = document.getElementById('gameUrl');
    const urlError = document.getElementById('urlError');

    // Función para mostrar el estado de carga
    function setLoading(isLoading) {
        addGameBtn.disabled = isLoading;
      addGameBtn.classList.toggle('loading', isLoading);
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

    // Función para extraer el ID de Steam
    function extractSteamAppId(url) {
     const match = url.match(/\/app\/(\d+)/);
  return match ? match[1] : null;
    }

    // Función para obtener información del juego desde Steam
    async function fetchSteamGameInfo(appId) {
        try {
  const proxyUrl = 'https://api.allorigins.win/get?url=';
         const steamUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
 const encodedUrl = encodeURIComponent(steamUrl);

 const response = await fetch(`${proxyUrl}${encodedUrl}`);
      const proxyData = await response.json();
            
  if (!proxyData.contents) {
    throw new Error('No se pudo obtener la información del juego');
         }

  const data = JSON.parse(proxyData.contents);
     
   if (data[appId].success) {
      const gameInfo = data[appId].data;
                const coopCategories = gameInfo.categories
     ?.filter(cat => cat.id === 38 || cat.id === 9 || cat.id === 1)
        ?.map(cat => cat.description) || [];

             // Solo proceder si el juego tiene modo cooperativo
      if (coopCategories.length > 0) {
               return {
        id: `steam_${appId}`,
      title: gameInfo.name,
description: gameInfo.short_description,
        imageUrl: gameInfo.header_image,
     storeUrl: `https://store.steampowered.com/app/${appId}`,
       storeType: 'steam',
      players: coopCategories.join(', '),
  status: 'pendiente',
           icon: 'fas fa-gamepad',
     addedDate: new Date().toISOString()
                    };
       } else {
         throw new Error('Este juego no parece tener modo cooperativo');
}
         }
          throw new Error('No se pudo obtener la información del juego');
        } catch (error) {
            console.error('Error obteniendo información del juego:', error);
       throw error;
        }
    }

    // Event listener para añadir juego
    addGameBtn.addEventListener('click', async () => {
        const url = gameUrlInput.value.trim();
        urlError.style.display = 'none';

        if (!isValidGameUrl(url)) {
            urlError.textContent = 'Por favor, introduce una URL válida de Steam o Epic Store';
         urlError.style.display = 'block';
            return;
   }

        setLoading(true);

        try {
   if (url.includes('store.steampowered.com')) {
                const appId = extractSteamAppId(url);
       if (appId) {
          const gameInfo = await fetchSteamGameInfo(appId);
   await saveGame(gameInfo);
        modal.style.display = 'none';
        gameUrlInput.value = '';
    } else {
       throw new Error('URL de Steam no válida');
}
            } else {
       urlError.textContent = 'La integración con Epic Store está en desarrollo';
        urlError.style.display = 'block';
         }
        } catch (error) {
   console.error('Error al añadir el juego:', error);
            urlError.textContent = error.message || 'Error al añadir el juego';
        urlError.style.display = 'block';
        } finally {
          setLoading(false);
      }
    });

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
  console.log('Rendering games:', games); // Debug log
        if (!games) {
console.log('No games data received'); // Debug log
            return;
        }
        
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

    console.log('Setting up Firebase listener...'); // Debug log
    // Escuchar cambios en la base de datos
    onGamesUpdate(renderGames);
});