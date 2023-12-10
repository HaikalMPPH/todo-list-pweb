import Todo from './Todo.js';

const todo = new Todo();
const tasks = todo.tasks;

const container = document.querySelector('.tasks');
const template = document.querySelector('#task');

const createTaskForm = document.querySelector('.create-task');
const createTaskField = document.querySelector('.create-task__textarea');
const createTaskButton = document.querySelector('.create-task__submit');

// Menggunakan style yang sudah ditentukan pada masing-masing task
tasks.forEach((data) => {
  onCreateTask({data});
});

// Button create menjadi disabled jika textfield task masih kosong.
createTaskField.addEventListener('input', () => {
  createTaskButton.disabled = !createTaskField.value;
});

// Handler tombol create.
createTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = createTaskField.value;

  if (value) {
    const data = {
      value,
      checked: false
    };

    todo.create(data);

    onCreateTask({data});

    createTaskForm.reset();
  }
});

// Membuat task dengan style yang telah ditentukan.
function onCreateTask({data}) {
  const clone = template.content.cloneNode(true);

  const task = clone.querySelector('.task');
  const checkbox = clone.querySelector('.task__checkbox');
  const title = clone.querySelector('.task__text');
  const del = clone.querySelector('.task__delete');

  title.innerHTML = data.value;
  checkbox.checked = data.checked;

  toggleTaskStatusClass({checked: data.checked, task});

  checkbox.addEventListener('input', () => {
    data.checked = checkbox.checked;

    toggleTaskStatusClass({checked: data.checked, task});

    todo.update(data);
  });

  title.addEventListener('input', () => {
    data.value = title.innerHTML;

    todo.update(data);
  });

  del.addEventListener('click', (e) => {
    todo.delete(data);

    task.remove();
  });

  container.appendChild(clone);
}

// Menentukan style berdasarkan kondisi task.
function toggleTaskStatusClass({checked, task}) {
  task.classList[checked ? 'add' : 'remove']('task--done');
}