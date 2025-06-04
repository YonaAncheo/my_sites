const board = document.getElementById("board");

board.addEventListener('click', (event) => {
  event.target.textContent = 'X';
})
