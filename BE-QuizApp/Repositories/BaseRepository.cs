using BE_QuizApp.Data.Context;
using BE_QuizApp.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace BE_QuizApp.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly AppDbContext _context;

        public BaseRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<T> Add(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        /*public Task<List<T>> GetAll(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();
            query = includes.Aggregate(query, (current, include) => current.Include(include));
            return query.ToListAsync();
        }*/

        public Task<List<T>> GetAll(Func<IQueryable<T>, IQueryable<T>> include = null)
        {
            IQueryable<T> query = _context.Set<T>();
            if (include != null)
                query = include(query);
            return query.ToListAsync();
        }

        public async Task<T> Get(int Id, Func<IQueryable<T>, IQueryable<T>> include = null)
        {
            IQueryable<T> query = _context.Set<T>();
            if (include != null)
                query = include(query);
            return await query.FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == Id);
        }

        /*public async Task<T> Get(int Id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();
            query = includes.Aggregate(query, (current, include) => current.Include(include));
            return await query.FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == Id);
        }*/

        public async Task<T> Update(T entity)
        {
            _context.Set<T>().Update(entity);
            _context.SaveChanges();
            return entity;
        }

        public async Task<T> Delete(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity != null)
            {
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
            }
            return entity;
        }
        public async Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities)
        {
            var entityList = entities.ToList();

            await _context.Set<T>().AddRangeAsync(entityList);
            await _context.SaveChangesAsync();
            return entityList;
        }
        public async Task<IEnumerable<T>> UpdateRangeAsync(IEnumerable<T> entities)
        {
            var entityList = entities.ToList();

            _context.Set<T>().UpdateRange(entities);
            await _context.SaveChangesAsync();

            return entityList;

        }


    }
}
