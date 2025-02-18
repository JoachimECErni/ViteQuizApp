using AutoMapper;
using BE_QuizApp.Data.Context;
using BE_QuizApp.Data.Contracts;
using BE_QuizApp.Data.Entity;
using BE_QuizApp.Repositories.Interfaces;
using BE_QuizApp.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace BE_QuizApp.Services
{
    public class QuizService : IQuizService
    {
        private readonly IBaseRepository<Quiz> _quizRepository;
        private readonly IBaseRepository<Question> _questionRepository;
        private readonly IBaseRepository<Choice> _choiceRepository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public QuizService(IBaseRepository<Quiz> quizRepository, IBaseRepository<Question> questionRepository, IBaseRepository<Choice> choiceRepository, IMapper mapper, AppDbContext context)
        {
            _quizRepository = quizRepository;
            _questionRepository = questionRepository;
            _choiceRepository = choiceRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<Quiz> CreateQuizAsync(CreateQuiz createQuiz)
        {
            var quiz = _mapper.Map<Quiz>(createQuiz);

            var createdQuiz = await _quizRepository.Add(quiz);

            var questions = createQuiz.Questions.Select(q => new Question
            {
                Description = q.Description,
                QuizId = createdQuiz.Id,
            });

            var createdQuestions = await _questionRepository.AddRangeAsync(questions);

            // Create choices and link them to their respective questions
            var choices = new List<Choice>();
            foreach (var question in createdQuestions.ToList())
            {
                var questionData = createQuiz.Questions.First(q => q.Description == question.Description);
                choices.AddRange(questionData.Choices.Select(choiceText => new Choice
                {
                    Description = choiceText,
                    QuestionId = question.Id 
                }));
            }

            var createdChoices = await _choiceRepository.AddRangeAsync(choices);

            // Prepare a list of questions to update with CorrectChoiceId
            var questionsToUpdate = new List<UpdateQuestion>();

            // Group created choices by QuestionId
            var groupedChoices = createdChoices.GroupBy(c => c.QuestionId).ToDictionary(g => g.Key, g => g.ToList());

            // Update CorrectChoiceId for each question based on the correct answer
            foreach (var question in createdQuestions)
            {
                var questionData = createQuiz.Questions.First(q => q.Description == question.Description);
                var correctChoiceText = questionData.CorrectAnswer; // Assuming this is the correct answer text

                // Find the correct choice based on the text
                if (groupedChoices.TryGetValue(question.Id, out var choicesForQuestion))
                {
                    var correctChoice = choicesForQuestion.FirstOrDefault(c => c.Description == correctChoiceText);
                    if (correctChoice != null)
                    {
                        // Directly update the CorrectChoiceId of the existing question
                        question.CorrectChoiceID = correctChoice.Id; // Set the correct choice ID
                    }
                }
            }

            var updatedQuestions = await _questionRepository.UpdateRangeAsync(createdQuestions);

            // Assign the respective choices to each updated question
            foreach (var question in updatedQuestions)
            {
                // Assign the choices to the question
                if (groupedChoices.TryGetValue(question.Id, out var choicesForQuestion))
                {
                    question.Choices = choicesForQuestion; // Assuming the Question class has a Choices property
                }
            }

            createdQuiz.Questions = updatedQuestions.ToList();


            return createdQuiz; // Return the complete quiz object
        }

        public async Task<Quiz> Delete(int id)
        {
            var quiz = await _quizRepository.Get(id);
            if (quiz == null)
                return null;

            var deletedQuiz = await _quizRepository.Delete(id);
            return deletedQuiz;
        }

        public async Task<Quiz> Get(int id)
        {
            return await _quizRepository.Get(id,
                query => query.Include(q => q.Questions)
                .ThenInclude(que => que.Choices));
        }

        public async Task<ICollection<Quiz>> GetAll()
        {
            return await _quizRepository.GetAll();
        }

        public async Task<Quiz> UpdateQuizAsync(UpdateQuiz updated)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var original_quiz = await Get(updated.Id);

                var updated_quiz = _mapper.Map(updated, original_quiz);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return updated_quiz;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
