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

// Delete and EDIT tasks.

taskUl.addEventListener('click', (event) => {
  if (event.target.classList.contains('del-btn')) {
    deleteTask(event.target.parentElement);
  } else if (event.target.classList.contains('edit-btn')){
    console.log(event.target);
    editTask(event.target.parentElement);
  }
})

function deleteTask(taskItem) {
  if(confirm('Are you sure to delete task?')){
    taskItem.remove();
  }
}

function editTask(taskItem) {
  const newTask = prompt('Edita la tarea:', taskItem.firstChild.textContent);
  if (newTask) {
    taskItem.firstChild.textContent = newTask;
  }
}
