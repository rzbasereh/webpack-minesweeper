import React from 'react';
import { IBoard } from '../types/board';
import Box from './Box';

interface IProps {
  board: IBoard;
  onBoxClicked: (x: number, y: number, setFlag?: boolean) => void;
}

const Board: React.FC<IProps> = ({ board, onBoxClicked }) => {
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div className='d-flex' key={rowIndex}>
          {row.map((box, boxIndex) => (
            <Box key={boxIndex} {...box} onClick={(setFlag) => onBoxClicked(rowIndex, boxIndex, setFlag)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
