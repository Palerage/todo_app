using API.Models;

namespace API.Interfaces
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllAsync();
        Task<Todo?> GetByIdAsync(Guid id);
        Task<Todo> CreateAsync(string content);
        Task UpdateContentAsync(Guid id, string content);
        Task UpdateStatusAsync(Guid id, bool isCompleted);
        Task DeleteAsync(Guid id);
    }
}
