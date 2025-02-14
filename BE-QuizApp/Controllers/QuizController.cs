using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE_QuizApp.Data.Context;
using BE_QuizApp.Data.Entity;
using BE_QuizApp.Data.Contracts;
using AutoMapper;
using BE_QuizApp.Repositories.Interfaces;
using BE_QuizApp.Repositories;
using BE_QuizApp.Services.Interfaces;

namespace BE_QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IBaseRepository<Quiz> _context;
        private readonly IQuizService _quizService;
        private readonly IMapper _mapper;

        public QuizController(IQuizService quizService, IMapper mapper, IBaseRepository<Quiz> context)
        {
            _quizService = quizService;
            _mapper = mapper;
            _context = context;
        }

        // GET: api/Quiz
        [HttpGet]
        public async Task<IActionResult> GetQuizzes()
        {
            var quizzes = await _quizService.GetAll();
            if(quizzes == null)
                return NotFound();
            var quizDTO = _mapper.Map<QuizDTO[]>(quizzes);
            return Ok(quizDTO);
        }

        // GET: api/Quiz/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuiz(int id)
        {
            var quiz = await _quizService.Get(id);

            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }

        // PUT: api/Quiz/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchQuiz(UpdateQuiz updateQuiz)
        {
            if (updateQuiz.Id == null)
            {
                return BadRequest();
            }

            Console.WriteLine(updateQuiz);

            //_context.Entry(quiz).State = EntityState.Modified;

            try
            {
                //await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                /*if (!QuizExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }*/
            }

            return NoContent();
        }

        // POST: api/Quiz
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostQuiz(CreateQuiz createQuiz)
        {
            var createdQuiz = await _quizService.CreateQuizAsync(createQuiz);

            return CreatedAtAction(nameof(GetQuiz),new {id = createdQuiz.Id}, createdQuiz);
        }

        // DELETE: api/Quiz/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz(int id)
        {
            var quiz = await _quizService.Delete(id);
            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }
    }
}
