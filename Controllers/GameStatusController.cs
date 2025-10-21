using Microsoft.AspNetCore.Mvc;
using ListajuegosCoop.Models;
using System.Text.Json;

namespace ListajuegosCoop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameStatusController : ControllerBase
    {
   private readonly IWebHostEnvironment _environment;
        private readonly string _dataPath;
        private static readonly object _lock = new object();

        public GameStatusController(IWebHostEnvironment environment)
     {
  _environment = environment;
   _dataPath = Path.Combine(_environment.ContentRootPath, "Data", "gameStatus.json");
        }

     private GameStatusCollection LoadGameStatus()
        {
       if (!System.IO.File.Exists(_dataPath))
      {
         return new GameStatusCollection();
            }

    var json = System.IO.File.ReadAllText(_dataPath);
      return JsonSerializer.Deserialize<GameStatusCollection>(json) ?? new GameStatusCollection();
        }

     private void SaveGameStatus(GameStatusCollection status)
        {
   var directory = Path.GetDirectoryName(_dataPath);
         if (!Directory.Exists(directory))
    {
            Directory.CreateDirectory(directory!);
            }

var json = JsonSerializer.Serialize(status, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(_dataPath, json);
        }

  [HttpGet]
     public IActionResult GetAll()
        {
            lock (_lock)
            {
    var status = LoadGameStatus();
                return Ok(status.Games);
  }
        }

 [HttpPost("{gameId}")]
  public IActionResult UpdateStatus(string gameId, [FromBody] string status)
        {
    lock (_lock)
  {
                var collection = LoadGameStatus();
         var game = collection.Games.FirstOrDefault(g => g.GameId == gameId);

      if (game == null)
   {
         game = new GameStatus { GameId = gameId, Status = status };
         collection.Games.Add(game);
      }
            else
      {
       if (game.Status != status)
   {
              game.Status = status;
   game.Votes = 1;
        }
      else
      {
    game.Votes++;
        }
        }

         SaveGameStatus(collection);
           return Ok(game);
      }
 }
    }
}