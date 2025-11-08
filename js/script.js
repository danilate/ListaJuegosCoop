import { onGamesUpdate, updateGameStatus, deleteGame, saveGame, updateGamesOrder } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('game-list');
    const modal = document.getElementById('addGameModal');
    const openModalBtn = document.getElementById('openAddGame');
    const closeModalBtn = document.querySelector('.close');
    const addGameBtn = document.getElementById('addGameBtn');
    const gameUrlInput = document.getElementById('gameUrl');
    const urlError = document.getElementById('urlError');

    // Función para extraer el ID de Steam
  function extractSteamAppId(url) {
    const match = url.match(/\/app\/(\d+)/);
        return match ? match[1] : null;
    }

    // Función para extraer el slug de Epic Store
    function extractEpicSlug(url) {
const match = url.match(/\/p\/([^/?#]+)/);
      return match ? match[1] : null;
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

    // Función para obtener información del juego desde Steam
 async function fetchSteamGameInfo(appId) {
        try {
            const proxyUrl = 'https://corsproxy.io/?';
            const steamUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}&l=spanish`;
    const encodedUrl = encodeURIComponent(steamUrl);
 
     const response = await fetch(`${proxyUrl}${encodedUrl}`, {
     headers: {
             'Accept': 'application/json'
           }
      });

            if (!response.ok) {
            throw new Error('Error al obtener datos de Steam');
   }

            const data = await response.json();
   
         if (data[appId].success) {
  const gameInfo = data[appId].data;
 const coopCategories = gameInfo.categories
         ?.filter(cat => cat.id === 38 || cat.id === 9 || cat.id === 1)
   ?.map(cat => cat.description) || [];

              if (coopCategories.length > 0) {
  return {
id: `steam_${appId}`,
            title: decodeEntities(gameInfo.name),
         description: decodeEntities(gameInfo.short_description),
     imageUrl: gameInfo.header_image,
     storeUrl: `https://store.steampowered.com/app/${appId}`,
      storeType: 'steam',
    players: coopCategories.join(', '),
            status: 'pendiente',
              icon: 'fas fa-gamepad',
       addedDate: new Date().toISOString()
            };
       }
        throw new Error('Este juego no parece tener modo cooperativo');
  }
    throw new Error('No se pudo obtener la información del juego');
        } catch (error) {
    console.error('Error obteniendo información del juego:', error);
            throw error;
        }
    }

    // Función para obtener información del juego desde Epic
    async function fetchEpicGameInfo(slug) {
        try {
            const proxyUrl = 'https://corsproxy.io/?';
    const epicUrl = `https://store.epicgames.com/es-ES/p/${slug}`;
const encodedUrl = encodeURIComponent(epicUrl);
 
            const response = await fetch(`${proxyUrl}${encodedUrl}`);
         const html = await response.text();
      
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const title = doc.querySelector('h1')?.textContent || 
     doc.querySelector('meta[property="og:title"]')?.content ||
             decodeEntities(slug.replace(/-/g, ' '));
   
            const description = doc.querySelector('meta[property="og:description"]')?.content ||
          doc.querySelector('meta[name="description"]')?.content ||
         'Descripción no disponible';
       
     const imageUrl = doc.querySelector('meta[property="og:image"]')?.content ||
 doc.querySelector('meta[property="twitter:image"]')?.content;

            const hasMultiplayer = html.toLowerCase().includes('multijugador') || 
       html.toLowerCase().includes('cooperativo') ||
      html.toLowerCase().includes('co-op') ||
         html.toLowerCase().includes('multiplayer');

            if (!hasMultiplayer) {
        throw new Error('Este juego no parece tener modo cooperativo');
  }

  return {
    id: `epic_${slug}`,
  title: decodeEntities(title),
     description: decodeEntities(description),
          imageUrl: imageUrl,
          storeUrl: `https://store.epicgames.com/es-ES/p/${slug}`,
        storeType: 'epic',
        players: 'Cooperativo',
                status: 'pendiente',
    icon: 'fab fa-epic-games',
         addedDate: new Date().toISOString()
    };
        } catch (error) {
         console.error('Error obteniendo información del juego:', error);
            throw error;
        }
    }

    // Función para decodificar entidades HTML
    function decodeEntities(text) {
        if (!text) return '';
      const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        const decoded = textarea.value;
        textarea.remove();
        return decoded;
    }

    // Función para procesar la URL y añadir el juego
    async function processGameUrl() {
        const url = gameUrlInput.value.trim();
     urlError.style.display = 'none';

        if (!isValidGameUrl(url)) {
       urlError.textContent = 'Por favor, introduce una URL válida de Steam o Epic Store';
    urlError.style.display = 'block';
    return;
        }

        setLoading(true);

        try {
            let gameInfo;
            if (url.includes('store.steampowered.com')) {
   const appId = extractSteamAppId(url);
   if (!appId) {
       throw new Error('URL de Steam no válida');
   }
        gameInfo = await fetchSteamGameInfo(appId);
} else if (url.includes('store.epicgames.com')) {
          const slug = extractEpicSlug(url);
         if (!slug) {
         throw new Error('URL de Epic Store no válida');
 }
     gameInfo = await fetchEpicGameInfo(slug);
          } else {
        throw new Error('URL no soportada');
            }

            await saveGame(gameInfo);
    modal.style.display = 'none';
     gameUrlInput.value = '';
  } catch (error) {
        console.error('Error al añadir el juego:', error);
            urlError.textContent = error.message || 'Error al añadir el juego';
          urlError.style.display = 'block';
   } finally {
            setLoading(false);
        }
    }

    // Event listener para el botón de añadir
    addGameBtn.addEventListener('click', processGameUrl);

    // Event listener para la tecla Enter en el campo de URL
    gameUrlInput.addEventListener('keypress', async (event) => {
     if (event.key === 'Enter') {
   event.preventDefault();
         await processGameUrl();
        }
    });

    // Event listeners para el modal
    openModalBtn?.addEventListener('click', () => {
        modal.style.display = 'block';
     gameUrlInput.value = '';
        urlError.style.display = 'none';
        gameUrlInput.focus(); // Poner foco en el campo de URL
    });

    closeModalBtn?.addEventListener('click', () => {
    modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
 if (event.target === modal) {
 modal.style.display = 'none';
        }
    });

    // Función para mostrar el estado de carga
    function setLoading(isLoading) {
        addGameBtn.disabled = isLoading;
     addGameBtn.classList.toggle('loading', isLoading);
    }

    // Función para renderizar todos los juegos
    function renderGames(games) {
      if (!games) {
     console.log('No games data received');
  return;
  }
        
        gameList.innerHTML = '';
     
        // Ordenar juegos primero por orden y luego por estado
        const sortedGames = Object.entries(games)
    .map(([id, game]) => ({ ...game, id }))
 .sort((a, b) => {
    // Primero ordenar por estado
    const statusOrder = { pendiente: 0, disfrutado: 1, rechazado: 2 };
     const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    
      if (statusDiff !== 0) return statusDiff;
                
                // Si tienen el mismo estado, ordenar por el orden personalizado
                return (a.order || 0) - (b.order || 0);
   });

  sortedGames.forEach(game => {
            gameList.appendChild(createGameCard(game));
        });
    }

    // Función para actualizar el orden en Firebase
    async function updateOrder() {
        const cards = [...gameList.children];
        const orderedIds = cards.map(card => card.getAttribute('data-id'));
  try {
  await updateGamesOrder(orderedIds);
        } catch (error) {
 console.error('Error saving order:', error);
     }
    }

    // Event listener para el contenedor de juegos
    gameList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingCard = document.querySelector('.dragging');
        if (!draggingCard) return;

        const cards = [...gameList.children].filter(card => card !== draggingCard);
        const closestCard = cards.reduce((closest, card) => {
   const box = card.getBoundingClientRect();
            const offset = e.clientY - box.top - box.height / 2;
   
            if (offset < 0 && offset > closest.offset) {
             return { offset, element: card };
      } else {
                return closest;
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element;

        if (closestCard) {
            closestCard.parentNode.insertBefore(draggingCard, closestCard);
        } else {
            gameList.appendChild(draggingCard);
        }
    });

    // Función para crear una tarjeta de juego
    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.setAttribute('data-status', game.status);
        card.setAttribute('data-id', game.id);
        card.draggable = true;
        
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
              <i class="${game.storeType === 'steam' ? 'fab fa-steam' : 'fab fa-epic-games'}"></i> 
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

        // Event listeners para drag and drop
        card.addEventListener('dragstart', (e) => {
    card.classList.add('dragging');
  e.dataTransfer.setData('text/plain', game.id);
          e.dataTransfer.effectAllowed = 'move';
});

        card.addEventListener('dragend', () => {
          card.classList.remove('dragging');
      document.querySelectorAll('.game-card').forEach(card => {
   card.classList.remove('drag-over');
     });
            // Actualizar el orden en Firebase cuando se suelta la tarjeta
            updateOrder();
 });

        // Event listeners originales
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

        const select = card.querySelector('.status-select');
        select.addEventListener('change', async (event) => {
        event.stopPropagation();
try {
      await updateGameStatus(game.id, event.target.value);
              card.setAttribute('data-status', event.target.value);
     } catch (error) {
 console.error('Error al actualizar el estado:', error);
        event.target.value = game.status;
  }
        });

        return card;
    }

    // Escuchar cambios en la base de datos
    onGamesUpdate(renderGames);
});