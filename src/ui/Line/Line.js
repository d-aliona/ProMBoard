import style from '../../assets/scss/ui.module.scss';

const Line = ({ width }) => {
  return <hr className={style.line} style={{ width: width }} />;
};

export default Line;
