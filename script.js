// Variables globales
let gameData = null;

// Función para cargar los datos del JSON
async function loadGameData() {
    try {
        const response = await fetch('/api/GameStatus');
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

// Función para guardar los datos en el servidor
async function saveGameData() {
    try {
        const response = await fetch('/api/GameStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        });

        if (!response.ok) {
            throw new Error('No se pudo guardar los datos');
        }

        const result = await response.json();
        console.log('Estados guardados:', result.message);
    } catch (error) {
        console.error('Error guardando datos:', error);
    }
}

// Función para actualizar el estado de un juego
async function updateGameStatus(gameId, newStatus) {
    const game = gameData.games.find(g => g.gameId === gameId);
    if (game) {
        game.status = newStatus;
        await saveGameData();
    }
}

// Inicializar la aplicación
async function initializeApp() {
    await loadGameData();

    // Configurar los selectores de estado
    document.querySelectorAll('.status-select').forEach(select => {
        const gameId = select.id;
        const game = gameData.games.find(g => g.gameId === gameId);

        if (game) {
            select.value = game.status;
            select.closest('.game-card').setAttribute('data-status', game.status);
        }

        // Evento para cambio de estado
        select.addEventListener('change', async (event) => {
            const newStatus = event.target.value;
            const card = event.target.closest('.game-card');
            card.setAttribute('data-status', newStatus);
            await updateGameStatus(gameId, newStatus);
        });
    });
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Configurar los selectores de estado
    document.querySelectorAll('.status-select').forEach(select => {
        // Evento para cambio de estado
        select.addEventListener('change', (event) => {
            const newStatus = event.target.value;
            const card = event.target.closest('.game-card');
            card.setAttribute('data-status', newStatus);
        });
    });
});
