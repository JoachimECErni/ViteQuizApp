using System.IO;
using BE_QuizApp.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE_QuizApp.Data.Configurations
{
    public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
    {
        public void Configure(EntityTypeBuilder<Quiz> builder)
        {
            builder.HasMany(qui => qui.Questions)
               .WithOne(que => que.Quiz);
        }
    }
}
