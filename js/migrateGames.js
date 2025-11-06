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
    {
        id: "baldursgate3",
        title: "Baldur's Gate 3",
        description: "RPG narrativo basado en D&D con decisiones profundas",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
    storeUrl: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
        storeType: "steam",
      players: "Hasta 4 jugadores",
        status: "pendiente",
        icon: "fas fa-dice-d20"
    },
    {
    id: "ittakestwo",
title: "It Takes Two",
  description: "Una aventura de plataformas diseñada exclusivamente para dos jugadores, donde la cooperación es la clave",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1426210/header.jpg",
        storeUrl: "https://store.steampowered.com/app/1426210/It_Takes_Two/",
   storeType: "steam",
        players: "2 jugadores",
        status: "pendiente",
        icon: "fas fa-running"
    },
    {
        id: "deeprock",
   title: "Deep Rock Galactic",
        description: "Un shooter cooperativo donde enanos espaciales minan, exploran y luchan contra alienígenas en cuevas destructibles",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg",
  storeUrl: "https://store.steampowered.com/app/548430/Deep_Rock_Galactic/",
        storeType: "steam",
        players: "Hasta 4 jugadores",
    status: "pendiente",
        icon: "fas fa-gem"
    },
    {
    id: "valheim",
      title: "Valheim",
        description: "Un juego de supervivencia y exploración brutal en un vasto mundo nórdico",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg",
        storeUrl: "https://store.steampowered.com/app/892970/Valheim/",
        storeType: "steam",
        players: "Hasta 10 jugadores",
        status: "pendiente",
        icon: "fas fa-hammer"
    },
    {
id: "overcooked2",
        title: "Overcooked! 2",
        description: "Un caótico juego de simulación de cocina donde hasta cuatro chefs deben trabajar juntos",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/728880/header.jpg",
     storeUrl: "https://store.steampowered.com/app/728880/Overcooked_2/",
        storeType: "steam",
        players: "Hasta 4 jugadores",
        status: "pendiente",
        icon: "fas fa-utensils"
 },
    {
    id: "l4d2",
        title: "Left 4 Dead 2",
        description: "Un shooter cooperativo centrado en la supervivencia contra hordas de zombis",
 imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg",
  storeUrl: "https://store.steampowered.com/app/550/Left_4_Dead_2/",
        storeType: "steam",
 players: "Hasta 4 jugadores",
        status: "pendiente",
        icon: "fas fa-skull"
 },
    {
        id: "avatar",
        title: "Avatar: Frontiers of Pandora",
     description: "Aventura de acción en primera persona en el inexplorado continente de Pandora",
        imageUrl: "https://cdn2.unrealengine.com/avatar-key-art-1920x1080-1920x1080-c6c032a6a625.jpg",
   storeUrl: "https://store.epicgames.com/es-ES/p/avatar-frontiers-of-pandora",
        storeType: "epic",
   players: "Campaña para 2 jugadores (Online)",
        status: "pendiente",
        icon: "fas fa-leaf"
    },
];

async function migrateGames() {
    console.log('Iniciando migración de juegos...');
    for (const game of games) {
        try {
            const gameId = await saveGame(game);
  console.log(`Juego migrado: ${game.title} (ID: ${gameId})`);
     // Esperar un poco entre cada juego para no sobrecargar la base de datos
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`Error migrando ${game.title}:`, error);
        }
    }
    console.log('Migración completada');
}

// Ejecutar la migración
document.addEventListener('DOMContentLoaded', () => {
    const migrateBtn = document.createElement('button');
    migrateBtn.textContent = 'Iniciar Migración';
    migrateBtn.style.position = 'fixed';
    migrateBtn.style.bottom = '20px';
    migrateBtn.style.right = '20px';
    migrateBtn.onclick = migrateGames;
    document.body.appendChild(migrateBtn);
});