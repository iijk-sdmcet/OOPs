// Get references to the HTML elements
const todoInput = document.getElementById('todo-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.todo-item').forEach(item => {
    const taskText = item.querySelector('span').textContent;
    const completed = item.classList.contains('completed');
    tasks.push({ text: taskText, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create a new task element
function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  if (completed) {
    li.classList.add('completed');
  }

  // Task text
  const span = document.createElement('span');
  span.textContent = taskText;
  li.appendChild(span);

  // Complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✓';
  completeBtn.classList.add('complete-btn');
  completeBtn.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };
  li.appendChild(completeBtn);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => {
    todoList.removeChild(li);
    saveTasks();
  };
  li.appendChild(deleteBtn);

  // Add the new task to the list
  todoList.appendChild(li);
}

// Add new task when the button is clicked
addTaskBtn.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (taskText) {
    createTaskElement(taskText);
    todoInput.value = ''; // Clear the input field
    saveTasks(); // Save to localStorage
  } else {
    alert('Please enter a task!');
  }
});

// Allow adding task by pressing Enter
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

// Switch theme between light and dark mode
function toggleTheme() {
  const body = document.body;
  if (themeToggle.checked) {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}

// Load the stored theme from localStorage on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.checked = true;
} else {
  document.body.classList.add('light-mode');
  themeToggle.checked = false;
}

// Event listener for theme toggle
themeToggle.addEventListener('change', toggleTheme);

// Load tasks when the page loads
window.onload = loadTasks;
