namespace BE_QuizApp.Exceptions
{
    public class ExceptionMessage
    {
        public static object GetMessage(Exception exception)
        {
            return new
            {
                Message = exception.Message,
                InnerExceptionMessage = exception.InnerException?.Message
            };
        }
    }
}
