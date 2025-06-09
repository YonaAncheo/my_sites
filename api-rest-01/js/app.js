const formUser = document.querySelector('#form-user');
const btn = formUser.lastElementChild;
const URLPOST = 'https://api-tasks.cosasdedevs.com/v1/users'

function createUser() {
  
}

btn.addEventListener('click', (event) => {
  event.preventDefault();
  const userName = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  postUser(userName,email,password);
})

// Methods

async function postUser(userName, email, password) {
  const response = await fetch(URLPOST, {
    method : 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    body : `username=${userName}&email=${email}&password=${password}`
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const result = await response.json();
  const status = await result.status;
  const user = await result.data.username;
  alert(JSON.stringify(`status: ${status}, User created: ${user}`));
}

