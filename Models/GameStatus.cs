namespace ListajuegosCoop.Models
{
    public class GameStatus
    {
        public string GameId { get; set; } = "";
        public string Status { get; set; } = "pendiente";
        public int Votes { get; set; } = 1;
  }

    public class GameStatusCollection
    {
   public List<GameStatus> Games { get; set; } = new List<GameStatus>();
    }
}