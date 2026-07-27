# Todo List — Spring Boot

A simple, full-stack Todo List application built with **Spring Boot 3**, **Spring Data JPA**, **H2** (in-memory database), and **Thymeleaf** for a lightweight web UI. Also exposes a full **REST API**.

## Features

- Create, read, update, delete todos
- Mark todos as complete / incomplete
- Priority levels (LOW / MEDIUM / HIGH)
- Filter by status (all / active / completed)
- Search by title
- Clean REST API (`/api/todos`)
- Simple web UI at `/`
- In-memory H2 database (no setup required), console at `/h2-console`

## Requirements

- Java 17+
- Maven 3.6+ (or use the included `mvnw` wrapper if you generate one)

## Run the app

```bash
mvn spring-boot:run
```

Then open:
- Web UI: http://localhost:8080/
- H2 console: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:tododb`
  - User: `sa`, Password: (blank)

## Build a jar

```bash
mvn clean package
java -jar target/todo-app.jar
```

## REST API

| Method | Endpoint                    | Description                    |
|--------|------------------------------|--------------------------------|
| GET    | `/api/todos`                 | List all todos                 |
| GET    | `/api/todos?completed=true`  | Filter by completed status      |
| GET    | `/api/todos?search=keyword`  | Search by title                |
| GET    | `/api/todos/{id}`            | Get a single todo               |
| POST   | `/api/todos`                 | Create a todo                   |
| PUT    | `/api/todos/{id}`            | Update a todo                   |
| PATCH  | `/api/todos/{id}/toggle`     | Toggle completed status         |
| DELETE | `/api/todos/{id}`            | Delete a todo                   |

### Example: create a todo

```bash
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","description":"2% milk","priority":"LOW"}'
```

## Project structure

```
src/main/java/com/example/todoapp/
├── TodoAppApplication.java     # Main entry point
├── config/DataInitializer.java# Seeds sample data on startup
├── controller/
│   ├── TodoRestController.java# REST API
│   └── WebController.java     # Serves the UI page
├── exception/                 # Custom exceptions + handler
├── model/Todo.java            # JPA entity
├── repository/TodoRepository.java
└── service/TodoService.java   # Business logic

src/main/resources/
├── application.properties
├── templates/index.html       # UI page (Thymeleaf)
└── static/
    ├── css/style.css
    └── js/app.js
```
