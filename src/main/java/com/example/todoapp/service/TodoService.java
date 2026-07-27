package com.example.todoapp.service;

import com.example.todoapp.exception.TodoNotFoundException;
import com.example.todoapp.model.Todo;
import com.example.todoapp.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Transactional(readOnly = true)
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo existing = getTodoById(id);
        existing.setTitle(updatedTodo.getTitle());
        existing.setDescription(updatedTodo.getDescription());
        existing.setPriority(updatedTodo.getPriority());
        existing.setCompleted(updatedTodo.isCompleted());
        return todoRepository.save(existing);
    }

    public Todo toggleCompleted(Long id) {
        Todo existing = getTodoById(id);
        existing.setCompleted(!existing.isCompleted());
        return todoRepository.save(existing);
    }

    public void deleteTodo(Long id) {
        Todo existing = getTodoById(id);
        todoRepository.delete(existing);
    }

    @Transactional(readOnly = true)
    public List<Todo> getByCompleted(boolean completed) {
        return todoRepository.findByCompleted(completed);
    }

    @Transactional(readOnly = true)
    public List<Todo> search(String keyword) {
        return todoRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
