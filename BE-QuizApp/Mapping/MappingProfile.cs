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

            CreateMap<UpdateQuiz, Quiz>()
                .ForMember(dest => dest.Questions, opt => opt.MapFrom(src => src.Questions));
            CreateMap<UpdateQuestion, Question>()
                .ForMember(dest => dest.Choices, opt => opt.MapFrom(src => src.Choices));
            CreateMap<UpdateChoice, Choice>();
        }
    }
}
