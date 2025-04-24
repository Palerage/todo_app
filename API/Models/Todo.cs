namespace API.Models
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
