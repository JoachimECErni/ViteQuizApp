namespace BE_QuizApp.Repositories.Interfaces
{
    public interface IBaseRepository<T>
    {
        Task<List<T>> GetAll(Func<IQueryable<T>, IQueryable<T>> include = null);
        Task<T> Get(int Id, Func<IQueryable<T>, IQueryable<T>> include = null);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
        Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities);

        Task<IEnumerable<T>> UpdateRangeAsync(IEnumerable<T> entities);
        Task SaveChangesAsync();
    }
}
