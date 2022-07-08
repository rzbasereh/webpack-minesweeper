import React, { useRef, useState, useEffect, useMemo } from 'react';
import { IGameState } from '../types/game';
import SevenSegmentDisplay from './SevenSegmentDisplay';

const TIMER_INTERVAL = 1000;

const addLeadingZeros = (num: number | string, length: number) => String(num).padStart(length, '0');

interface IProps {
  remainedMines?: number;
  gameState: IGameState;
  onResetClick?: () => void;
}

const Header: React.FC<IProps> = ({ remainedMines = 0, gameState, onResetClick }) => {
  const interval = useRef<undefined | NodeJS.Timer>();
  const [timer, setTimer] = useState(0);

  const resetBtnContent = useMemo(() => {
    switch (gameState) {
      case 'win':
        return '😎';
      case 'lost':
        return '😵';
      default:
        return '🙂';
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'started' || gameState === '') setTimer(0);
    if (gameState === 'started') {
      interval.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, TIMER_INTERVAL);
      return () => clearInterval(interval.current);
    } else if (interval.current) {
      clearInterval(interval.current);
    }
  }, [gameState]);

  if (timer >= 999) {
    clearInterval(interval.current);
    setTimer(999);
  }

  return (
    <div className='game-header'>
      <div className='game-header__display-wrapper'>
        <SevenSegmentDisplay value={addLeadingZeros(remainedMines, 3)} />
      </div>
      <div>
        <button className='game-header__reset-button' onClick={onResetClick}>
          <span>{resetBtnContent}</span>
        </button>
      </div>
      <div className='game-header__display-wrapper'>
        <SevenSegmentDisplay value={addLeadingZeros(timer, 3)} />
      </div>
    </div>
  );
};

export default Header;
