import React, { useState } from 'react';
import { IGameState } from '../types/game';
import { generateGameBoard, isWin, showBoxValue, showMines } from '../helper/common';
import Board from './Board';
import Header from './Header';

const BOARD_ROWS = 9;
const BOARD_COLS = 9;
const TOTAL_MINES = 10;

const Game = () => {
  const [gameState, setGameState] = useState<IGameState>('');
  const [visibleBoxes, setVisibleBoxes] = useState(0);
  const [remainedMines, setRemainedMines] = useState(TOTAL_MINES);
  const [board, setBoard] = useState(structuredClone(generateGameBoard(BOARD_ROWS, BOARD_COLS, TOTAL_MINES)));

  const handleBoxClick = (x: number, y: number, setFlag?: boolean) => {
    if (gameState === 'lost' || gameState === 'win') return;

    let newGameState: IGameState = 'started';
    let newRemainedMines = remainedMines;
    let newVisibleBoxes = visibleBoxes;
    let newBoard = structuredClone(board);
    const currentBox = newBoard[x][y];

    if (currentBox.visible) return;

    if (setFlag) {
      if (currentBox.type === 'flag') {
        newBoard[x][y].type = '';
        newRemainedMines += 1;
      } else {
        newBoard[x][y].type = 'flag';
        newRemainedMines -= 1;
      }
    } else {
      if (currentBox.type !== 'flag') {
        if (currentBox.isMine) {
          newBoard = showMines(newBoard, x, y);
          newGameState = 'lost';
        } else {
          const { board: modifiedBoard, showedCount } = showBoxValue(newBoard, x, y);
          newBoard = modifiedBoard;
          newVisibleBoxes += showedCount;
        }
      }
    }

    if (isWin(newVisibleBoxes, BOARD_ROWS, BOARD_COLS, TOTAL_MINES)) {
      newGameState = 'win';
    }

    setBoard(newBoard);
    setGameState(newGameState);
    setRemainedMines(newRemainedMines);
    setVisibleBoxes(newVisibleBoxes);
  };

  console.log(visibleBoxes);

  const resetGame = () => {
    setBoard(structuredClone(generateGameBoard(BOARD_ROWS, BOARD_COLS, TOTAL_MINES)));
    setGameState('');
    setRemainedMines(TOTAL_MINES);
    setVisibleBoxes(0);
  };

  return (
    <div className='game'>
      <div className='game-header-wrapper'>
        <Header gameState={gameState} remainedMines={remainedMines} onResetClick={resetGame} />
      </div>
      <div className='game-board-wrapper'>
        <Board board={board} onBoxClicked={handleBoxClick} />
      </div>
    </div>
  );
};

export default Game;
