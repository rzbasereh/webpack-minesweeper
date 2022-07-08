import React from 'react';
import { IBox } from '../types/board';
import clsx from 'clsx';
import mineIcon from '../assets/icons/mine.png';
import flagIcon from '../assets/icons/flag.png';

type IProps = IBox & {
  onClick?: (setFlag?: boolean) => void;
};

const Box: React.FC<IProps> = ({ isMine, visible, value, type, onClick }) => {
  function renderContent() {
    if (type === 'flag') return <img src={flagIcon} alt='flag' />;

    if (visible) {
      if (isMine) {
        return <img src={mineIcon} alt='mine' />;
      }
      return value;
    }
    return null;
  }

  return (
    <button
      className={clsx(
        'box',
        visible && type !== 'flag' && 'visible',
        value && `value-${value}`,
        type === 'failure' && 'bg-red'
      )}
      onClick={() => {
        onClick ? onClick() : {};
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onClick ? onClick(true) : {};
      }}
    >
      {renderContent()}
    </button>
  );
};

export default Box;
