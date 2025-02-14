using BE_QuizApp.Data.Configurations;
using BE_QuizApp.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BE_QuizApp.Data.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Choice> Choices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Quiz
            modelBuilder.ApplyConfiguration(new QuizConfiguration());

            // Question
            modelBuilder.Entity<Question>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.ApplyConfiguration(new QuestionConfiguration());

            // Choice
            modelBuilder.ApplyConfiguration(new ChoiceConfiguration());
        }
    }
}
