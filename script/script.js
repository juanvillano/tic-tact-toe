//CONSTRUCTORS

// function Person(name) {
//     this.name = name;
//     this.reputation = 0;
//     this.getReputation = () => this.reputation;
//     this.giveReputation = () => { this.reputation++; };
// }

// Person.prototype.getReputation = function() {
//     console.log(`${this.reputation}`);
// }

// Person.prototype.sayName = function() {
//     console.log(`My name is ${this.name}`);
// }

// function Player(name, score) {
//     if(!new.target) {
//         throw new Error("You must use the 'new' keyword to create an instance of Player");
//     }
//     this.name = name;
//     this.score = score;
// }

// Player.prototype.getScore = function() {
//     console.log(`${this.name} score is ${this.score}`);
// }

// Player.prototype.sayGoodbye = function() {
//     console.log(`Goodbye from ${this.name}`);
// }

// Player.prototype.sayHello = function() {
//     console.log(`Hi, I am ${this.name}`);
// }

// console.log(`The prototype of Player is:`, Object.getPrototypeOf(Player.prototype));

// // Make Player inherit from Person
// Object.setPrototypeOf(Player.prototype, Person.prototype);

// console.log(`The new prototype of Player is:`, Object.getPrototypeOf(Player.prototype));


// const steve = new Player("Steve", 100);
// steve.sayHello();
// steve.sayGoodbye();

// // console.log(Player.prototype);
// // console.log(Object.getPrototypeOf(steve));
// // console.log(Player.prototype.hasOwnProperty('sayHello'));
// // console.log(Player.prototype.hasOwnProperty('sayGoodbye'));
// // console.log(steve.valueOf());

// // console.log(Object.getPrototypeOf(Player.prototype) === Object.prototype);

// function Book(author, title, pages, read) {
//     this.author = author;
//     this.title = title;
//     this.pages = pages;
//     this.read = read;
// }

// // Constructor
// function User(name) {
//     this.name = name;
//     this.discordName = '@' + name;
// }


// //FACTORY FUNCTIONS

// // Factory function, a function that returns an object
// function createUser(name) {
//     const discordName = '@' + name;

//     let reputation = 0;
//     const getReputation = () => reputation;
//     const giveReputation = () => { reputation++; };

//     return {
//         name,
//         discordName,
//         getReputation,
//         giveReputation,
//     };
// }

// const josh = createUser('Josh');
// josh.getReputation();
// josh.giveReputation();

// console.log({
//     discordName: josh.discordName,
//     reputation: josh.getReputation(),
// });


// function createPlayer(name, level) {
//     // inherit from createUser
//     const { getReputation, giveReputation } = createUser(name);

//     const getLevel = () => level;
//     const increaseLevel = () => { level++; };

//     return {
//         name,
//         getLevel,
//         increaseLevel,
//         getReputation,
//         giveReputation,
//     };
// }


// const calculator = (() => {
//     let lastResult = 0;

//     const add = (a,b) => {
//         lastResult = a + b;
//         return lastResult;
//     }

//     const subtract = (a, b) => {
//         lastResult = a - b;
//         return lastResult;
//     }

//     const multiply = (a,b) => {
//         lastResult = a * b;
//         return lastResult;
//     }

//     const divide = (a,b) => {
//         lastResult = a / b;
//         return lastResult;
//     }

//     const getLastResult = () => lastResult;

//     return {
//         add, subtract, multiply, divide, getLastResult,
//     };

// })();

// console.log(calculator.add(5,3));
// console.log(calculator.getLastResult());
// console.log(calculator.subtract(10,4));
// console.log(calculator.getLastResult());


// TODO: Create a GameBoard object to store the board as an array, manage the state of each cell
// Stores array board
// manages state of each cell
// returns the state of the board, which cells are marked and which are empty

function gameBoard() {
    const rows = 3;
    const cols = 3;
    let gameBoardArray = [];

    // Create the board array with empty strings
    const cleanBoard = () => {
        for (let i = 0; i < rows; i++) {
            gameBoardArray[i] = [];
            for (let j = 0; j < cols; j++) {
                gameBoardArray[i][j] = '';
            }
        }
    }
    
    // get the board array
    const getBoard = () => gameBoardArray;

    // mark a cell with player's symbol (X or O)
    const markCell = (row, col, symbol) => {
        if (gameBoardArray[row][col] === '') {
            gameBoardArray[row][col] = symbol;
            return true;
        }
        return false;
    }

    cleanBoard();

    return {
        getBoard,
        markCell,
        cleanBoard,
    };

}


// TODO: Create a Player factory function 
// create a player with a name, symbol (X or O), and score

function createPlayer(name, symbol) {

    let score = 0;

    const getName = () => name;
    const setName = (newName) => { name = newName };

    const getSymbol = () => symbol;
    const setSymbol = (newSymbol) => { symbol = newSymbol };
    
    const getScore = () => score;
    const increaseScore = () => { score++; }; 

    return {
        getName,
        setName,
        getSymbol,
        setSymbol,
        getScore,
        increaseScore,
    }
}

// TODO: Create a GameFlow Controller Object

const gameController = (() => {

    // create a game board object
    const board = gameBoard();

    // combinations
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // rounds
    let rounds = 0;
    const getRounds = () => rounds;
    const increaseRounds = () => { rounds++ };

    // draws
    let draws = 0;
    const getDraws = () => draws;
    const increaseDraws = () => { draws++ };

    // create players
    const playerOne = createPlayer('Player One', 'X');
    const playerTwo = createPlayer('Player Two', 'O');

    // active player
    let activePlayer = playerOne;

    // get current player
    const getActivePlayer = () => activePlayer;

    // Switch turns
    const switchTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
        return activePlayer;
    }

        // Get player move
    const getMove = function(row, col) {
        return board.markCell(row, col, activePlayer.getSymbol());
    }

    // read the state of the game board after every turn
    const readBoardState = () => board.getBoard();
    
    // check for winner or tie
    const checkWinner = () => {
        let winner = 3;

        const currentBoard = readBoardState().flat();

        const positions = {
            X: [],
            O: [],
        };

        currentBoard.forEach((cell, index) => {
            if(cell === 'X') positions.X.push(index);
            if(cell === 'O') positions.O.push(index);
        });

        if (wins.some(combo => combo.every(index => currentBoard[index] === 'X'))) {
            winner = 1;
            playerOne.increaseScore();
        } else if (wins.some(combo => combo.every(index => currentBoard[index] === 'O'))) {
            winner = 2;
            playerTwo.increaseScore();
        } else if (currentBoard.every(cell => cell !== '')) {
            winner = 0;
            increaseDraws();
        }

        // Record the position of each player on the board
        // const playersPositions = currentBoard.reduce((accumulator, currentVal, index) => {
        //     if (!accumulator[currentVal]) accumulator[currentVal] = [];
        //     if(currentVal === 'X' || currentVal === 'O') {
        //         accumulator[currentVal].push(index);
        //     }
        //     return accumulator;
        // }, {});

        // if(playersPositions['X'] && playersPositions['X'].length >= 3) {
        //     if (wins.some(subArray => subArray.length === playersPositions['X'].length && subArray.every((value, index) => value === playersPositions['X'][index]))) {
        //         winner = 1;
        //         playerOne.increaseScore();
        //     }
        // } else if(playersPositions['O'] && playersPositions['O'].length >= 3) {
        //     if(wins.some(subArray => subArray.length === playersPositions['O'].length && subArray.every((value, index) => value === playersPositions['O'][index]))) {
        //         winner = 2;
        //         playerTwo.increaseScore();
        //     } 
        // } else {
        //     // check if empty cells 
        //     let isDraw = currentBoard.every(item => item != "");
        //     // if board is full then is a draw
        //     if (isDraw) {
        //         winner = 0;
        //     } else {
        //         winner = 3;
        //     }
        // }
        //console.log(`Winner is ${winner}!`)
        // 1 = X
        // 2 = O
        // 0 = draw
        // 3 = game continues
        return winner;
    }

    // play a round
    const playRound = (row, col) => {
       const isMoveValid = getMove(row, col);

       if (!isMoveValid) return;

       const result = checkWinner();

       if (result === 3) {
        switchTurn();
       } else if (result === 0 || result === 1 || result === 2) {
        board.cleanBoard();
        activePlayer = playerOne;
       }

       return result;
    }

    return {
        playRound,
        getActivePlayer,
        playerOne,
        playerTwo,
        readBoardState,
        getBoard: board.getBoard,
        getRounds,
        increaseRounds,
        getDraws,
        increaseDraws,
        cleanBoard: board.cleanBoard,
        }
})();

// TODO: Create a DisplayController object 
// control the display of the game and DOM logic to render the content of the game board and player information
function displayController() {
    const game = gameController;
    const boardContainer = document.querySelector('.board');
    const turnShow = document.querySelector('.turn > span');
    const xScore = document.querySelector('.x_score');
    const oScore = document.querySelector('.o_score');
    const playerX = document.querySelector('.player_x_name');
    const playerO = document.querySelector('.player_o_name');
    const drawScore = document.querySelector('.draw_score');

    // SVG symbols
    const xSymbol = document.createElement('img');
    xSymbol.setAttribute('src', './assets/x.svg');

    const oSymbol = document.createElement('img');
    oSymbol.setAttribute('src', './assets/circle.svg');

    game.playerOne.setName('John');
    game.playerTwo.setName('Albert');

    playerX.textContent = `${game.playerOne.getName()}`;
    playerO.textContent = `${game.playerTwo.getName()}`;

    // TODO: Create an UpdateScreen method
    function updateScreen()  {
        // Clear the current board
        boardContainer.textContent = "";
        turnShow.textContent = "";

        // Get the up-to-date board
        const board = game.getBoard();

        // current player
        const currentPlayer = game.getActivePlayer();

        // update scores
        xScore.textContent = `${game.playerOne.getScore()}`;
        oScore.textContent = `${game.playerTwo.getScore()}`;
        drawScore.textContent = `${game.getDraws()}`;

        //console.log(`the current player is ${currentPlayer.getName()}`);
        // Render player's turn in a div
        turnShow.appendChild(currentPlayer === game.playerOne ? xSymbol : oSymbol);

        // Render scores
        xScore.textContent = `${game.playerOne.getScore()}`;
        oScore.textContent = `${game.playerTwo.getScore()}`;

        // Render each grid square on the DOM
        board.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {

                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                //cellButton.textContent = column;
                if (column === 'X') {
                    const xIcon = xSymbol.cloneNode(true);
                    cellButton.appendChild(xIcon);
                } else if ( column === 'O') {
                    const oIcon = oSymbol.cloneNode(true);
                    cellButton.appendChild(oIcon);
                }

                boardContainer.appendChild(cellButton);

            });
        });

    }


    // TODO: Create a clickHandlerBoard method
    function clickHandlerBoard(e) {
        console.log('column index:', e.target.dataset.column)
        console.log('row index:', e.target.dataset.row)

        // gets the data attribute value
        const clickedButton = e.target;

         // pass data to playround
        const result = game.playRound(clickedButton.dataset.row, clickedButton.dataset.column);

        if(result === 1) {
            console.log('Player One wins!!')
            game.increaseRounds();
        } else if (result === 2) {
            console.log('Player Two wins!!')
            game.increaseRounds();
        } else if (result === 0) {
            console.log('It is a draw!!')
            game.increaseRounds();
        }

        // run updated screen method to refresh DOM
        updateScreen();
    }

    boardContainer.addEventListener('click', clickHandlerBoard);
        

    updateScreen();
}

displayController();