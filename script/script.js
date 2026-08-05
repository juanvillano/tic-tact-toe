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

const gameBoard = (()=> {
    const rows = 3;
    const cols = 3;
    let gameBoardArray = [];

    // creating the board array with empty strings
    for (let i = 0; i < rows; i++) {
        gameBoardArray[i] = [];
        for (let j = 0; j < cols; j++) {
            gameBoardArray[i][j] = '';
        }
    }
    
    // get the board array
    const getBoard = () => gameBoardArray;


    // mark a cell with player's symbol (X or O)
    const markCell = (row, col, symbol) => {
        const cells = gameBoardArray.filter((row) => row[col] === '');

        if (cells.length === 0) {
            return `Cell at row ${row}, col ${col} is already occupied.`;
        } else {
            gameBoardArray[row][col] = symbol;
        }
    }

    return {
        getBoard,
        markCell,
    };

})();

console.log(gameBoard.getBoard());
console.log(gameBoard.markCell(0, 1, 'X'));
console.log(gameBoard.markCell(1, 1, 'O'));
console.log(gameBoard.getBoard());

// TODO: Create a Player factory function 
// create a player with a name, symbol (X or O), and score

function createPlayer(name, symbol, score = 0) {

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
// read the state of the game board after every turn
// check for winner or tie
// switch turns between players


// TODO: Create a DisplayController object 
// control the display of the game and DOM logic to render the content of the game board and player information


// TODO: Create functions that allow players to make moves and update the game board
// TODO: Create a function to not allow player to make a move in a cell that is already occupied
// TODO: Create a function to clean the interface and allow players to put in their names
// TODO: Include a button to start and restart the game
// TODO: Create a display element to show results upon game completion