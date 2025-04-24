using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

public class TodoRepository : ITodoRepository
{
    private readonly AppDbContext _context;

    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Todo>> GetAllAsync() => await _context.Todos.ToListAsync();

    public async Task<Todo?> GetByIdAsync(Guid id) => await _context.Todos.FindAsync(id);

    public async Task<Todo> CreateAsync(string content)
    {
        var entity = new Todo
        {
            Id = Guid.NewGuid(),
            Content = content,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.Todos.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateContentAsync(Guid id, string content)
    {
        var entity = await _context.Todos.FindAsync(id);
        if (entity == null) return;

        entity.Content = content;
        await _context.SaveChangesAsync();
    }

    public async Task UpdateStatusAsync(Guid id, bool isCompleted)
    {
        var entity = await _context.Todos.FindAsync(id);
        if (entity == null) return;

        entity.IsCompleted = isCompleted;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.Todos.FindAsync(id);
        if (entity != null)
        {
            _context.Todos.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
