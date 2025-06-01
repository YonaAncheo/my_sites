const taskForm = document.getElementById('task-form');
const taskUl = document.getElementById('task-list');

// ADD task
// I need to add action listener to my form.
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskInput = document.getElementById('task-input');
  const task = taskInput.value;
  if (task) {
    taskUl.append(taskLi(task));
    taskInput.value = '';
  }
  
})

function taskLi(task) {
  const li = document.createElement('li');
  li.textContent = task;
  li.append(createBtn('Delete','del-btn'),createBtn('Edit','edit-btn'));
  return li;
}

function createBtn(text, className) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = className;
  return btn;
}

