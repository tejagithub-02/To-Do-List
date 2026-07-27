package com.example.todoapp.config;

import com.example.todoapp.model.Todo;
import com.example.todoapp.repository.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedData(TodoRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Todo("Set up project repository", "Initialize Git and push first commit", Todo.Priority.HIGH));
                repository.save(new Todo("Design database schema", "Plan tables for todos feature", Todo.Priority.MEDIUM));
                repository.save(new Todo("Buy groceries", "Milk, eggs, bread, coffee", Todo.Priority.LOW));
                Todo done = new Todo("Write project proposal", "Draft and send to the team", Todo.Priority.MEDIUM);
                done.setCompleted(true);
                repository.save(done);
            }
        };
    }
}
