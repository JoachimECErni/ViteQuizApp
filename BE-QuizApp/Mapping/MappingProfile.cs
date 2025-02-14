using AutoMapper;
using BE_QuizApp.Data.Contracts;
using BE_QuizApp.Data.Entity;

namespace BE_QuizApp.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateQuiz, Quiz>()
                .ForMember(dest => dest.Questions, opt => opt.Ignore());
            CreateMap<Quiz, QuizDTO>();
        }
    }
}
