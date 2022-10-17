import React from 'react';
import style from '../../assets/scss/ui.module.scss';

interface LogoProps {
  font?: string;
  hideText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ font, hideText }) => {
  return (
    <div className={style.logo}>
      <div className={style.logoicon}></div>
      <div
        className={style.logotext}
        style={{ fontSize: font, display: hideText ? 'none' : '' }}
      >
        ProMBoard
      </div>
    </div>
  );
};

export default Logo;
