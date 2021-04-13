
const startButton = document.querySelector('.start-btn');
const gridContainer = document.querySelector('.grid');
const resetButton = document.querySelector('.reset-btn');


//Event listeners
startButton.addEventListener('click',(e) => {
    gridContainer.style.display = 'grid';
    statusDisplay.style.display = 'inline';
})



let player = 'X';

const statusDisplay = document.querySelector('#player-turn');
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Player ${player} has won!`;
const drawMessage = () => `Draw!`;
const currentPlayerTurn = () => `It's ${player}'s turn.`;

statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = player;
    clickedCell.innerHTML = player;
}
function handlePlayerChange(){
    player = player === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}



let winScores = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];
function handleResultValidation(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++){
        const winCondition = winScores[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
document.querySelectorAll('.grid-cell').forEach(cell => cell.addEventListener('click', handleCellClick));
function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-index-number')
      );
    if (gameState[clickedCellIndex] !== "") {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

}
function handleRestartGame(){
    gameActive = true;
    player = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.grid-cell').forEach(cell => cell.innerHTML = '');

}
resetButton.addEventListener('click', handleRestartGame);




