using System.Text.Json.Serialization;
using BE_QuizApp.Data.Entity;

namespace BE_QuizApp.Data.Contracts
{
    public record CreateQuiz
    {
        [JsonPropertyName("Quiz Name")]
        public required string Name { get; set; }

        [JsonPropertyName("questions")]
        public required ICollection<CreateQuestion> Questions { get; set; }
    }

    public class QuizDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class UpdateQuiz
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<UpdateQuestion>? Questions { get; set; }
    }
}
