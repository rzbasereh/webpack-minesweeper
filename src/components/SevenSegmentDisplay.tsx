import clsx from 'clsx';
import React from 'react';
import isInteger from '../utils/isInteger';

const digitSegmentStates: { [key: string]: number[] } = {
  '0': [1, 1, 1, 1, 1, 1, 0],
  '1': [0, 1, 1, 0, 0, 0, 0],
  '2': [1, 1, 0, 1, 1, 0, 1],
  '3': [1, 1, 1, 1, 0, 0, 1],
  '4': [0, 1, 1, 0, 0, 1, 1],
  '5': [1, 0, 1, 1, 0, 1, 1],
  '6': [1, 0, 1, 1, 1, 1, 1],
  '7': [1, 1, 1, 0, 0, 0, 0],
  '8': [1, 1, 1, 1, 1, 1, 1],
  '9': [1, 1, 1, 1, 0, 1, 1],
};

interface IProps {
  value?: number | string;
}

const SevenSegmentDisplay: React.FC<IProps> = ({ value = 0 }) => {
  if (!isInteger(value)) throw new TypeError('Enter valid value');
  const digits = value.toString().split('');

  return (
    <div className='seven-segment-display'>
      {digits.map((digit, index) => (
        <div key={index} className='seven-segment'>
          <div className={clsx('seven-segment__first-segment', digitSegmentStates[digit][0] && 'active')}></div>
          <div className={clsx('seven-segment__second-segment', digitSegmentStates[digit][1] && 'active')}></div>
          <div className={clsx('seven-segment__third-segment', digitSegmentStates[digit][2] && 'active')}></div>
          <div className={clsx('seven-segment__fourth-segment', digitSegmentStates[digit][3] && 'active')}></div>
          <div className={clsx('seven-segment__fifth-segment', digitSegmentStates[digit][4] && 'active')}></div>
          <div className={clsx('seven-segment__sixth-segment', digitSegmentStates[digit][5] && 'active')}></div>
          <div className={clsx('seven-segment__seventh-segment', digitSegmentStates[digit][6] && 'active')}></div>
        </div>
      ))}
    </div>
  );
};

export default SevenSegmentDisplay;
