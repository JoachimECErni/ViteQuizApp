using System.IO;
using BE_QuizApp.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE_QuizApp.Data.Configurations
{
    public class ChoiceConfiguration : IEntityTypeConfiguration<Choice>
    {
        public void Configure(EntityTypeBuilder<Choice> builder)
        {
            builder.HasOne(ch => ch.Question)
               .WithMany(que => que.Choices);
        }
    }
}
