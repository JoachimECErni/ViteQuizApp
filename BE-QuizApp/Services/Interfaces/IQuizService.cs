using BE_QuizApp.Data.Contracts;
using BE_QuizApp.Data.Entity;

namespace BE_QuizApp.Services.Interfaces
{
    public interface IQuizService
    {
        Task<Quiz> CreateQuizAsync(CreateQuiz createQuiz);
        Task<ICollection<Quiz>> GetAll();
        Task<Quiz> Get(int id);

        Task<Quiz>Delete(int id);
    }
}
