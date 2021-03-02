import React from "react";
import Cell from "./Cell";
import { Result } from "./Types";

type BoardProps = {
  board: number[][];
  result: Result ;
  playCell: (row: number, cell: number) => void;
};

const Board = ({ board, result , playCell }: BoardProps) => {
  return (
    <div className="Board">
      {board.map((rowValues, row) => (
        <div key={row} className="Board-row">
          {rowValues.map((rowValue, col) => (
            <Cell
              key={col}
              id={`cell-${row}-${col}`}
              value={rowValue}
              victory={result.winCells ? result.winCells[row][col] : false}
              playCell={() => playCell(row, col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
