import style from '../../assets/scss/ui.module.scss';

const Initials = ({ user, size, font }) => {
  return (
    <div
      className={style.circle}
      style={{ width: size, height: size, fontSize: font }}
    >
      {user?.firstName[0] + user?.lastName[0]}
    </div>
  );
};

export default Initials;
