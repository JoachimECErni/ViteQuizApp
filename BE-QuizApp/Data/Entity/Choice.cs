namespace BE_QuizApp.Data.Entity
{
    public class Choice
    {
        public int Id { get; set; }
        public required string Description { get; set; }

        public required int QuestionId { get; set; }

        public virtual Question Question { get; set; }
    }
}
