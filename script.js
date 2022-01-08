// ****** Create Player Factory ****** //
const player = (name, symbol) => {
    return { name, symbol };
};


// ****** Create Gameboard Module ****** //

const gameBoard = (() => {
    let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    return {
        boardArray
    }

})();

// ****** Create Game Module ****** //

const playGame = (() => {

    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");
    let turnNumber = 1;
    let currentPlayer = player1;
    let gameOver = false;

    const btn = document.querySelectorAll('.grid-item');
    const turn = document.querySelector('.turn');

    btn.forEach((button) => {
        button.addEventListener('click', () => { 
            let tile = button.getAttribute('data-value')

            if (!isTileFull(tile) && !gameOver) {
                if (currentPlayer == player1) {
                    button.textContent = player1.symbol;
                    setTile(tile, player1.symbol);
                    nextTurn();
                } else if (currentPlayer == player2) {
                    button.textContent = player2.symbol;
                    setTile(tile, player2.symbol);
                    nextTurn();
                }
            }

            if (checkWinner()) {
                turn.textContent = "Winner!"
            }
        });
    }); 

    const resetBtn = document.querySelector('.replay');

    resetBtn.addEventListener('click', () => {
        replayGame();
    });

    const nextTurn = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;
            turn.textContent = "Player 2's turn."
        } else {
            currentPlayer = player1;
            turn.textContent = "Player 1's turn."
        }
        turnNumber++;
    }

    const isTileFull= (tile) => {
        if (gameBoard.boardArray[tile] == "X" || gameBoard.boardArray[tile] == "O") {
            return true;
        } else {
            return false;
        }
    }

    const setTile = (tile, symbol) => {
        gameBoard.boardArray[tile] = symbol;
    }

    const checkWinner = () => {
        const winningCombos = [ [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
                                [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
                                [0, 4, 8], [2, 4, 6] //diagonals
                                ];

        for(let i = 0; i < winningCombos.length; i++) {
            let counterX = 0;
            let counterO = 0;
            let combo = winningCombos[i];

            for(let j = 0; j < combo.length; j++) {
                if (gameBoard.boardArray[combo[j]] == "X") {
                    counterX++;
                } else if (gameBoard.boardArray[combo[j]] == "O") {
                    counterO++;
                }
            }
            if (counterX == 3 || counterO == 3) {
                gameOver = true;
                return true;
            } 
        }

        return false;

    }

    const replayGame = () => {
        gameBoard.boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        turnNumber = 1;
        currentPlayer = player1;
        gameOver = false;
        turn.textContent = "Player 1's turn.";

        btn.forEach((button) => {
            button.textContent = "";
        });
    }

})();


