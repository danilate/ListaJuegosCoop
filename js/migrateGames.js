import { saveGame } from './firebase.js';

const games = [
    {
        id: "enshrouded",
        title: "Enshrouded",
        description: "Supervivencia y RPG en mundo abierto corrompido por niebla mágica",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1203620/header.jpg",
        storeUrl: "https://store.steampowered.com/app/1203620/Enshrouded/",
   storeType: "steam",
      players: "Hasta 16 jugadores",
        status: "pendiente",
        icon: "fas fa-users"
    },
    // ... más juegos aquí
];

async function migrateGames() {
    console.log('Iniciando migración de juegos...');
    for (const game of games) {
        try {
const gameId = await saveGame(game);
          console.log(`Juego migrado: ${game.title} (ID: ${gameId})`);
        } catch (error) {
      console.error(`Error migrando ${game.title}:`, error);
        }
    }
console.log('Migración completada');
}

// Ejecutar la migración
migrateGames();