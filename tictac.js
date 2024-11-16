let gameArea = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";  
let gameActive = true;   

// Winning positions
const winningPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]           
];

// Function to start the game
function StartGame() {
    const Area = document.getElementById("Playingarea");
    Area.innerHTML = "";  // Clear board

    gameArea.forEach((cell, location) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.onclick = () => OnCellClick(location);
        Area.appendChild(cellElement);
    });
}

// Function to handle click on each cell
function OnCellClick(location) {
    if (gameArea[location] !== "" || !gameActive) return;  

    gameArea[location] = currentPlayer; 
    DisplayArea(); 
    Winner(); 
}

// Function to render the board
function DisplayArea() {
    const Area = document.getElementById("Playingarea");
    const cells = Area.getElementsByClassName("cell");

    Array.from(cells).forEach((cell, location) => {
        cell.textContent = gameArea[location];
        cell.style.pointerEvents = gameArea[location] === "" && gameActive ? "auto" : "none";
    });
}

// Function to check winner
function Winner() {
    const status = document.getElementById("status");

    // Check for winning combinations
    for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];
        if (gameArea[a] && gameArea[a] === gameArea[b] && gameArea[a] === gameArea[c]) {
            gameActive = false;
            alert(`Player ${currentPlayer} wins! Hip Hip Hurry`);
            return;
        }
    }

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to start a new game
function NewGame() {
    gameArea = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").textContent = "Player X's turn";
    StartGame();  // Initialize the board
}

// Start the game when the page loads
StartGame();
