import style from '../../assets/scss/ui.module.scss';

const Logo = ({ font, hideText }) => {
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
