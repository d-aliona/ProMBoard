import React from 'react';
import style from '../../assets/scss/ui.module.scss';

interface Initialsprops {
  user: User;
  size?: string;
  font?: string;
}

const Initials: React.FC<Initialsprops> = ({ user, size, font }) => {
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
