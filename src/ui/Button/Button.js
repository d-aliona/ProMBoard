import React, { useState, useEffect } from 'react';

import style from '../../assets/scss/ui.module.scss';

const Button = ({ title, width, height, back, hover, onClick }) => {
  const [backColor, setBackColor] = useState(back);
  const basicColor = hover ? hover : 'rgba(23, 43, 77, 1)';
  const [colorTitle, setColorTitle] = useState(basicColor);
  const [bold, setBold] = useState('400');
  return (
    <button
      className={style.button}
      style={{
        width: width,
        height: height,
        backgroundColor: backColor,
        color: colorTitle,
        border: `1px solid ${colorTitle}`,
        fontWeight: bold,
      }}
      onClick={onClick}
      onMouseOver={() => {
        setBackColor(hover);
        setColorTitle('white');
        setBold('500');
      }}
      onMouseOut={() => {
        setBackColor(back);
        setColorTitle(basicColor);
        setBold('400');
      }}
    >
      {title}
    </button>
  );
};

export default Button;
