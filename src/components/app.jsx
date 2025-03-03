import React from 'react';
import Square from './Square';
import {Header,Foot} from './Title';

function App(){
   
    const [Board,Boardchanger] = React.useState(Array(9).fill(null));  //an array of 9 null elements to save the board plays//
    const [xIsNext, setXIsNext] = React.useState(true);  //to switch turns//

        const winning_combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const winner = checkWin(Board); //passing the value of the win or No win//
        let status;  //status being a div that displays the current/next sequence of the game//
        var element = document.getElementsByClassName("status");  //using DOM to add a color in a win or a tie status, element is a HTMLCollection (an array-like object).//

        if (winner) {
          status = "Winner: " + winner;
          element[0].classList.add("endgame");
        } else {
          status = "Next player: " + (xIsNext ? "X" : "O");
        }
        if (checkTie(Board) && !winner){
        status = "it's a tie!!";
        element[0].classList.add("endgame");
        }

//i declared Set() as an arrow function so an infinite loop doesn't happen (OnSquareClick{Set()} calling Set() each time the page get rendered when the Board is changed)  
//if we passed it as: onSquareClick={Set},the Set function get passed down as a prop. we aren't calling it, this solves the loop but we need to declare a new function fo each square       
function Set(i){  

    if (Board[i] || checkWin(Board)) { //so we don't allow overwritten and stop when the game is won//
        return;
      }

    const nextSquares = Board.slice();  //array.slice(start, end), A new array (copy) containing the selected elements.//
    if(xIsNext){
        nextSquares[i] = "X";
    } else {
        nextSquares[i] = "O";
    }
    Boardchanger(nextSquares); //passing the new board//
    setXIsNext(!xIsNext); //switching turns each time//
}

function checkWin(Board) { //to check if the player won in any given input//
    for(let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i];  //deconstructuring each element(which is also an array) of the array of combinations//
        if(Board[a] && Board[a]===Board[b] && Board[a]===Board[c]){
          var e = document.getElementsByClassName("square"); //so the winning squares change colors//
          e[a].classList.add("win");
          e[b].classList.add("win");
          e[c].classList.add("win");
            return Board[a];
        }
    }
    return null
}

function checkTie(Board){  //to check when it's a tie//
    for(let i = 0; i < Board.length; i++) {
        if(Board[i]=== null) {
            return false;
        }
    }
    return true
}

return( 
    <>
    <Header></Header>
    <h2 className="status">{status}</h2>
    <table id='board'>
    <tr>
      <Square className='square' value={Board[0]} OnSquareClick={()=>Set(0)}></Square> 
      <Square className='square' value={Board[1]} OnSquareClick={()=>Set(1)}></Square>
      <Square className='square' value={Board[2]} OnSquareClick={()=>Set(2)}></Square>
    </tr>
    <tr>
      <Square className='square' value={Board[3]} OnSquareClick={()=>Set(3)}></Square>
      <Square className='square' value={Board[4]} OnSquareClick={()=>Set(4)}></Square>
      <Square className='square' value={Board[5]} OnSquareClick={()=>Set(5)}></Square>
    </tr>
    <tr>
      <Square className='square' value={Board[6]} OnSquareClick={()=>Set(6)}></Square>
      <Square className='square' value={Board[7]} OnSquareClick={()=>Set(7)}></Square>
      <Square className='square' value={Board[8]} OnSquareClick={()=>Set(8)}></Square>
    </tr>
  </table>
  <Foot></Foot>
  </>
 );
}
export default App;