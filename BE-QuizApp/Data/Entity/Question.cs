using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_QuizApp.Data.Entity
{
    public class Question
    {
        public int Id { get; set; }
        public required string Description {  get; set; }

        public int QuizId { get; set; }

        public Quiz Quiz { get; set; }

        public int CorrectChoiceID { get; set; }

        public virtual ICollection<Choice> Choices { get; set; }
    }
}
