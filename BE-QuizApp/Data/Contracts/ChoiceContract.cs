using System.Text.Json.Serialization;
using BE_QuizApp.Data.Entity;

namespace BE_QuizApp.Data.Contracts
{
    public record CreateChoice
    {
        public required string Description { get; set; }
        public required int? QuestionId { get; set; }
    }
}
