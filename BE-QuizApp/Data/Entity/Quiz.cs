namespace BE_QuizApp.Data.Entity
{
    public class Quiz
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public virtual ICollection<Question>? Questions { get; set; } = new List<Question>();
    }
}
