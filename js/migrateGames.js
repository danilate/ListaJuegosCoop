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
        id: "ror2",
        title: "Risk of Rain 2",
    description: "Un roguelike de acción en tercera persona donde luchas contra hordas de monstruos",
  imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/632360/header.jpg",
   storeUrl: "https://store.steampowered.com/app/632360/Risk_of_Rain_2/",
        storeType: "steam",
        players: "Hasta 4 jugadores",
        status: "pendiente",
        icon: "fas fa-meteor"
    },
    {
        id: "gmod",
  title: "Garry's Mod",
     description: "Un sandbox de física donde puedes construir, experimentar y jugar en modos cooperativos",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/4000/header.jpg",
      storeUrl: "https://store.steampowered.com/app/4000/Garrys_Mod/",
      storeType: "steam",
        players: "32+ jugadores",
        status: "pendiente",
        icon: "fas fa-tools"
    },
 {
    id: "forest",
        title: "The Forest",
        description: "Un juego de terror y supervivencia donde tú y tus amigos debéis defenderos de caníbales mutantes",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg",
        storeUrl: "https://store.steampowered.com/app/242760/The_Forest/",
        storeType: "steam",
     players: "Hasta 8 jugadores",
        status: "pendiente",
     icon: "fas fa-tree"
    },
    {
        id: "mhw",
        title: "Monster Hunter: World",
 description: "Un RPG de acción donde cazas monstruos gigantes en ecosistemas vastos",
      imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/582010/header.jpg",
        storeUrl: "https://store.steampowered.com/app/582010/Monster_Hunter_World/",
   storeType: "steam",
        players: "Hasta 4 jugadores",
        status: "pendiente",
        icon: "fas fa-dragon"
    },
    {
        id: "ktane",
        title: "Keep Talking and Nobody Explodes",
      description: "Un jugador desarma una bomba mientras sus amigos leen el manual para darle instrucciones",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/341800/header.jpg",
   storeUrl: "https://store.steampowered.com/app/341800/Keep_Talking_and_Nobody_Explodes/",
        storeType: "steam",
        players: "2+ jugadores",
    status: "pendiente",
 icon: "fas fa-bomb"
    },
    {
        id: "rocketleague",
        title: "Rocket League",
    description: "Fútbol con coches propulsados por cohetes, incluye modos cooperativos",
      imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg",
        storeUrl: "https://store.steampowered.com/app/252950/Rocket_League/",
   storeType: "steam",
        players: "Hasta 8 jugadores",
        status: "pendiente",
        icon: "fas fa-car"
    },
    {
        id: "awayout",
    title: "A Way Out",
        description: "Un juego de acción y aventura diseñado exclusivamente para dos jugadores en pantalla dividida",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1222700/header.jpg",
        storeUrl: "https://www.ea.com/es-es/games/a-way-out",
        storeType: "ea",
        players: "2 jugadores",
        status: "pendiente",
        icon: "fas fa-jail"
    },
    {
        id: "achilles",
    title: "Achilles: Legends Untold",
        description: "Souls-like mitológico con combate táctico y modo arena",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1314000/header.jpg",
        storeUrl: "https://store.steampowered.com/app/1314000/Achilles_Legends_Untold/",
        storeType: "steam",
    players: "Modo cooperativo",
    status: "pendiente",
 icon: "fas fa-sword"
    },
 {
        id: "stranger",
        title: "Stranger of Paradise: Final Fantasy Origin",
        description: "Reimaginación oscura del universo Final Fantasy con misiones multijugador",
     imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1358700/header.jpg",
        storeUrl: "https://store.steampowered.com/app/1358700/STRANGER_OF_PARADISE_FINAL_FANTASY_ORIGIN/",
        storeType: "steam",
  players: "Online",
        status: "pendiente",
        icon: "fas fa-dragon"
    },
    {
        id: "helldivers2",
  title: "Helldivers 2",
    description: "Shooter táctico frenético con fuego amigo y misiones galácticas",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg",
        storeUrl: "https://store.steampowered.com/app/553850/HELLDIVERS_2/",
        storeType: "steam",
     players: "Hasta 4 jugadores",
  status: "pendiente",
        icon: "fas fa-meteor"
    },
    {
        id: "smalland",
        title: "Smalland: Survive the Wilds",
        description: "Aventura diminuta en la naturaleza, doma insectos y construye bases",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/768200/header.jpg",
        storeUrl: "https://store.steampowered.com/app/768200/Smalland_Survive_the_Wilds/",
   storeType: "steam",
        players: "Hasta 10 jugadores",
        status: "pendiente",
 icon: "fas fa-bug"
    },
  {
    id: "breadfred",
        title: "Bread & Fred",
      description: "Plataformas de precisión cooperativo muy desafiante, unidos por una cuerda",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1607680/header.jpg",
        storeUrl: "https://store.steampowered.com/app/1607680/Bread__Fred/",
        storeType: "steam",
        players: "2 jugadores (Local y Online)",
        status: "pendiente",
 icon: "fas fa-mountain"
    },
    {
     id: "readyornot",
        title: "Ready or Not",
        description: "Shooter en primera persona enfocado en operaciones SWAT, inmersivo y realista",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1144200/header.jpg",
        storeUrl: "https://store.steampowered.com/app/1144200/Ready_or_Not/",
        storeType: "steam",
        players: "Hasta 5 jugadores (Online)",
        status: "pendiente",
        icon: "fas fa-shield-alt"
    },
    {
        id: "fortheking2",
        title: "For The King II",
  description: "RPG de tablero con mecánicas roguelite y combate por turnos",
      imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1676840/header.jpg",
storeUrl: "https://store.steampowered.com/app/1676840/For_The_King_II/",
        storeType: "steam",
        players: "Hasta 4 jugadores (Online)",
    status: "pendiente",
        icon: "fas fa-chess"
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
    {
        id: "escape",
        title: "Escape Simulator",
     description: "Juego de acertijos en primera persona con salas de escape muy interactivas",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1435790/header.jpg",
     storeUrl: "https://store.steampowered.com/app/1435790/Escape_Simulator/",
     storeType: "steam",
        players: "Online (Todos los cuartos)",
        status: "pendiente",
        icon: "fas fa-key"
    },
    {
        id: "sworn",
        title: "Sworn",
        description: "Roguelike de acción cooperativo ambientado en un Camelot caído y corrupto",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/2263060/header.jpg",
        storeUrl: "https://store.steampowered.com/app/2263060/Sworn/",
        storeType: "steam",
        players: "1-4 jugadores",
        status: "pendiente",
        icon: "fas fa-crown"
    },
    {
 id: "shipoffools",
        title: "Ship of Fools",
        description: "Roguelite cooperativo marítimo. Lucha contra monstruos marinos manejando cañones",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1286580/header.jpg",
        storeUrl: "https://store.steampowered.com/app/1286580/Ship_of_Fools/",
      storeType: "steam",
        players: "2 jugadores (Local y Online)",
        status: "pendiente",
        icon: "fas fa-ship"
    },
    {
        id: "carrytheglass",
        title: "Carry The Glass",
        description: "Divertido juego de física donde debes entregar bebidas sin derramarlas",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1729760/header.jpg",
        storeUrl: "https://store.steampowered.com/app/1729760/Carry_The_Glass/",
        storeType: "steam",
        players: "Hasta 4 jugadores",
        status: "pendiente",
        icon: "fas fa-glass-martini"
    }
];

async function migrateGames() {
    const migrateBtn = document.querySelector('.migrate-button');
    const originalText = migrateBtn.textContent;
    let successCount = 0;
    let errorCount = 0;

    try {
        migrateBtn.textContent = 'Iniciando migración...';
        migrateBtn.disabled = true;

     console.log('Iniciando migración de juegos...');
        
        for (const game of games) {
            try {
       migrateBtn.textContent = `Migrando: ${game.title}`;
       const gameId = await saveGame(game);
      console.log(`? Juego migrado: ${game.title} (ID: ${gameId})`);
  successCount++;
  
        // Esperar un poco entre cada juego
     await new Promise(resolve => setTimeout(resolve, 500));
   } catch (error) {
         console.error(`? Error migrando ${game.title}:`, error);
           errorCount++;
            }
        }

      const totalGames = games.length;
     const summary = `Migración completada: ${successCount}/${totalGames} juegos migrados`;
        console.log(summary);
        
        if (errorCount > 0) {
            console.log(`Hubo ${errorCount} errores durante la migración`);
        }

     // Mostrar resultado final
        migrateBtn.textContent = summary;
        setTimeout(() => {
            migrateBtn.textContent = originalText;
migrateBtn.disabled = false;
  }, 5000);

        // Si todo fue exitoso, remover el botón después de un tiempo
 if (errorCount === 0) {
   setTimeout(() => {
         migrateBtn.remove();
// Recargar la página para mostrar los datos migrados
   window.location.reload();
  }, 6000);
        }

    } catch (error) {
        console.error('Error general durante la migración:', error);
        migrateBtn.textContent = 'Error en la migración';
     migrateBtn.disabled = false;
    }
}

// Crear y añadir el botón de migración
document.addEventListener('DOMContentLoaded', () => {
  const migrateBtn = document.createElement('button');
    migrateBtn.textContent = 'Iniciar Migración';
    migrateBtn.className = 'migrate-button';
    migrateBtn.style.position = 'fixed';
    migrateBtn.style.bottom = '20px';
    migrateBtn.style.right = '20px';
    migrateBtn.onclick = migrateGames;
    document.body.appendChild(migrateBtn);

    console.log('Script de migración listo. Presiona el botón para iniciar la migración de', games.length, 'juegos.');
});