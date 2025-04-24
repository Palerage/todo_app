using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        public TodoController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllTodos()
        {
            var todos = await _todoRepository.GetAllAsync();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodoById(Guid id)
        {
            var todo = await _todoRepository.GetByIdAsync(id);
            if (todo == null) return NotFound();
            return Ok(todo);
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> CreateTodo([FromBody] string content)
        {
            var created = await _todoRepository.CreateAsync(content);
            return CreatedAtAction(nameof(GetTodoById), new { id = created.Id }, created);
        }

        [HttpPatch("{id}/content")]
        public async Task<IActionResult> UpdateContent(Guid id, [FromBody] string content)
        {
            await _todoRepository.UpdateContentAsync(id, content);
            return NoContent();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] bool isCompleted)
        {
            await _todoRepository.UpdateStatusAsync(id, isCompleted);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(Guid id)
        {
            var todo = await _todoRepository.GetByIdAsync(id);
            if (todo == null) return NotFound();

            await _todoRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
