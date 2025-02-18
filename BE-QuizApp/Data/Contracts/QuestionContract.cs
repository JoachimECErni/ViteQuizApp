using System.Text.Json.Serialization;
using BE_QuizApp.Data.Entity;

namespace BE_QuizApp.Data.Contracts
{
    public record CreateQuestion
    {
        public required string Description { get; set; }
        public string CorrectAnswer{  get; set; }
        public required ICollection<String> Choices { get; set; }
    }

    public class UpdateQuestion
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int QuizId { get; set; }
        public int CorrectChoiceID { get; set; }
        public virtual ICollection<UpdateChoice>? Choices { get; set; }
    }
}
