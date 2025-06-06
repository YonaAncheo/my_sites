const board = document.getElementById("board");
const row1 = document.getElementById('row-1');
const row2 = document.getElementById('row-2');
const row3 = document.getElementById('row-3');
const winCondition = {
  'X': ['X','X','X'],
  'O': ['O','O','O'],
  'row-1' : ['','',''],
  'row-2' : ['','',''],
  'row-3' : ['','',''],
  'diag-1': ['','',''],
  'diag-2': ['','','']
};

board.addEventListener('click', (event) => {
  if(event.target.nodeName === 'BUTTON'){
    event.target.textContent = 'X';
    noteMove(event.target);
  }
})

function noteMove(target) {
  let col = 0;
  let move = target.textContent;
  let id = target.parentElement.id;
  if (target.id === 'col-b') {col = 1}
  else if (target.id === 'col-c') {col = 2};
  
  winCondition[id][col] = move;
}

function thereAWinner(){
  if(winCondition["row-1"] === winCondition.X || winCondition["row-2"] === winCondition.X || winCondition["row-3"] === winCondition.X ){
    alert("PLAYER X WIN");
  }
}
