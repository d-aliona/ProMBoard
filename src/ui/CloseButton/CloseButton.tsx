import React from 'react';
import style from '../../assets/scss/ui.module.scss';

interface CloseButtonProps {
  width?: string;
  height?: string;
  border?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ width, height, border, onClick }) => {
  return (
    <button
      className={style.closeButton}
      style={{ width: width, height: height, border: border }}
      onClick={onClick}
    >
      ×
    </button>
  );
};

export default CloseButton;
