import React, { useState } from "react";
import "./App.scss";

import Board from "./Board";
import FeedbackBar from "./FeedbackBar";
import { Result } from "./Types";

const getResult = (board: number[][], 
                   lastCell: { row: number, col: number },
                   totalTurns: number): Result => {
  let winCells = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ]
  // Check last played cell row                  
  if (board[lastCell.row][0] === board[lastCell.row][1]
   && board[lastCell.row][0] === board[lastCell.row][2]) {
    winCells[lastCell.row][0] = true
    winCells[lastCell.row][1] = true
    winCells[lastCell.row][2] = true
    return {                  
      winCells,
      winPlayer: board[lastCell.row][0]
    }
  }
  // Check last played cell column
  if (board[0][lastCell.col] === board[1][lastCell.col]
    && board[0][lastCell.col] === board[2][lastCell.col]) {
    winCells[0][lastCell.col] = true
    winCells[1][lastCell.col] = true
    winCells[2][lastCell.col] = true
    return {
      winCells,
      winPlayer: board[0][lastCell.col]
    }
  }
  // Check first diagonal
  if (lastCell.row === lastCell.col 
   && board[0][0] === board[1][1]
   && board[0][0] === board[2][2]) {
    winCells[0][0] = true
    winCells[1][1] = true
    winCells[2][2] = true
    return {
      winCells,
      winPlayer: board[0][0]
    }
  }
  // Check second diagonal
  if (lastCell.row + lastCell.col 
   && board[0][2] === board[1][1]
   && board[0][2] === board[2][0]) {
    winCells[0][2] = true
    winCells[1][1] = true
    winCells[2][0] = true
    return {
      winCells,
      winPlayer: board[0][2]
    }
  }
  const isBoardFull = (totalTurns === 9)
  return { draw: isBoardFull }
};

const App: React.FC = () => {
  
  // Values for the board cells
  // 0 = Not played
  // 1 = played by player X
  // -1 = played by player O
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]

  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState(1);
  const [totalTurns, setTotalTurns] = useState(0);
  const [lastCell, setLastCell] = useState({row: 0, col: 0})


  const playCell = (row: number, col: number) => {
    if (board[row][col] !== 0 || result.winPlayer || result.draw) { return; }
    board[row][col] = player;
    setBoard(board);
    setPlayer(-player);
    setTotalTurns(totalTurns + 1);
    setLastCell({row, col});

  };

  const resetGame = () => {
    setBoard(emptyBoard)
    setTotalTurns(0)
    setPlayer(1)
    setLastCell({row: 0, col: 0})
  };

  const result: Result = getResult(board, lastCell, totalTurns);

  return (
    <div className="App">
      <div className="App-center">
        <h1 className="App-title">Tic Tac Toe</h1>
        <FeedbackBar {...{ player, result, resetGame }} />
        <Board {...{ board, result, playCell }} />
      </div>
    </div>
  );
};

export default App;
