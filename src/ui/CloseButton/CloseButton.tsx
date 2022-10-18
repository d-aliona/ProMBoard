import React from 'react';
import style from '../../assets/scss/ui.module.scss';

interface CloseButtonProps {
  width?: string;
  height?: string;
  border?: string;
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ width, height, border, onClick }) => {
  return (
    <span
      className={style.closeButton}
      style={{ width: width, height: height, border: border }}
      onClick={onClick}
    >
      ×
    </span>
  );
};

export default CloseButton;
