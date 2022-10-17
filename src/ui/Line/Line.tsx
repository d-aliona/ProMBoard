import React from 'react';
import style from '../../assets/scss/ui.module.scss';

interface LineProps {
  width?: string;
}

const Line: React.FC<LineProps> = ({ width }) => {
  return <hr className={style.line} style={{ width: width }} />;
};

export default Line;
