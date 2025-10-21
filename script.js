// Variables globales
let gameData = null;

// Función para cargar los datos del JSON
async function loadGameData() {
    try {
        const response = await fetch('./data/gameStatus.json');
   if (!response.ok) {
          throw new Error('No se pudo cargar los datos');
    }
        gameData = await response.json();
    return gameData;
    } catch (error) {
        console.error('Error cargando datos:', error);
        return {
            games: [],
            lastUpdate: new Date().toISOString()
        };
    }
}

// El resto del código se mantiene igual como estaba en docs/script.js
[Previous content remains unchanged...]