const taskForm = document.getElementById('task-form');
const taskUl = document.getElementById('task-list');

// ADD task
// With this function, when I submit my form, it adds the task to the "ul" 
// list and creates a task in the database using a POST request.
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskInput = document.getElementById('task-input');
  const task = taskInput.value;
  
  if (task) {
    newTask = taskLi(task);
    taskUl.append(newTask);
    postTask(newTask.id, newTask.firstChild.textContent)
    taskInput.value = '';
  }
  
})

// This function creates the "li" element to add to the "ul" section
function taskLi(task) {
  const li = document.createElement('li');
  li.textContent = task;
  li.append(createBtn('Delete','del-btn'),createBtn('Edit','edit-btn'));
  var id = 1;
  while(document.getElementById(taskUl.childElementCount + id)){
    id ++;
    li.id = taskUl.childElementCount + id;
  }
  li.id = taskUl.childElementCount + id;
  return li;
}

// This function creates the "button" element to add to the "li" section
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
  console.log(taskItem.id);
  if(confirm('Are you sure to delete task?')){
    deleteFetch(taskItem.id);
    taskItem.remove();
  }
}

function editTask(taskItem) {
  const newTask = prompt('Edita la tarea:', taskItem.firstChild.textContent);
  console.log(newTask);
  if (newTask) {
    taskItem.firstChild.textContent = newTask;
    console.log(taskItem.id,taskItem.firstChild.textContent);
    updateTask(taskItem.id,taskItem.firstChild.textContent);
  }
}


// Persistence.

async function postTask(id, taskDescription) {
  data = {id: id , task : taskDescription}
  await fetch('api/tasks.php', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(data)
  });

}

async function getAllTask() {
  const result = await fetch('api/tasks.php');
  const tasks = await result.json();
  tasks.forEach(item => {
    const li = document.createElement('li');
    console.log(item.task, item.id);
    li.textContent = item.task;
    li.id = item.id;
    li.append(createBtn('Delete','del-btn'),createBtn('Edit','edit-btn'));
    taskUl.append(li);
  });
}

async function updateTask(id, newTask) {
  data = {id: id , task : newTask};
  console.log(data);
  await fetch('api/tasks.php',{
    method : 'PUT',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(data)
  });
}

async function deleteFetch(idTask) {
  console.log(idTask);
  data = {id:idTask};
  console.log(data);
  await fetch('api/tasks.php', {
    method : 'DELETE',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(data)
  })
}

getAllTask();

// Toogle for page theme using the localStorage.

const themeToogleBtn = document.getElementById('toggle-theme-btn');
const currentTheme = localStorage.getItem('theme');

if( currentTheme === 'dark') {
  document.body.className='dark-theme';
}

themeToogleBtn.addEventListener('click', () => {
  theme = localStorage.getItem('theme');
  //console.log(theme);
  if (theme === 'light' || theme === null) {
    //console.log('true');
    localStorage.setItem('theme','dark');
    document.body.className='dark-theme';
  } else {
    //console.log('false');
    localStorage.setItem('theme','light');
    document.body.className='light-theme';
  }
})
