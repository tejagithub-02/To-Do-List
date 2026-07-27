const API = '/api/todos';
let todos = [];
let currentFilter = 'all';

const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const todoForm = document.getElementById('todoForm');

async function fetchTodos() {
    const res = await fetch(API);
    todos = await res.json();
    render();
}

async function createTodo(title, description, priority) {
    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority })
    });
    await fetchTodos();
}

async function toggleTodo(id) {
    await fetch(`${API}/${id}/toggle`, { method: 'PATCH' });
    await fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    await fetchTodos();
}

function render() {
    const filtered = todos.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    todoList.innerHTML = '';
    emptyState.hidden = filtered.length !== 0;

    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <div class="todo-content">
                <p class="todo-title"></p>
                <p class="todo-desc"></p>
                <div class="todo-meta">
                    <span class="badge ${todo.priority}">${todo.priority}</span>
                </div>
            </div>
            <div class="todo-actions">
                <button class="icon-btn delete-btn" title="Delete">🗑️</button>
            </div>
        `;
        li.querySelector('.todo-title').textContent = todo.title;
        li.querySelector('.todo-desc').textContent = todo.description || '';
        li.querySelector('.todo-checkbox').addEventListener('change', () => toggleTodo(todo.id));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));
        todoList.appendChild(li);
    });

    document.getElementById('totalCount').textContent = todos.length;
    document.getElementById('activeCount').textContent = todos.filter(t => !t.completed).length;
    document.getElementById('doneCount').textContent = todos.filter(t => t.completed).length;
}

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const priority = document.getElementById('priority').value;
    if (!title) return;
    await createTodo(title, description, priority);
    todoForm.reset();
    document.getElementById('priority').value = 'MEDIUM';
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

fetchTodos();
