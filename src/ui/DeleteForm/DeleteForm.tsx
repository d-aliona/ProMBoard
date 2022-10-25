import React from 'react';

import style from '../../assets/scss/deleteForm.module.scss';

interface DelCardProps {
  text: string;
  onClickYes: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickNo: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const DeleteForm: React.FC<DelCardProps> = ({ text, onClickYes, onClickNo }) => {
  
  return (
    <>
      <div className={style.deleteCardForm}>
        {text}
        <button
          className={style.buttonYes}
          style={{ fontSize: '16px' }}
          onClick={onClickYes}
        >
          Yes
        </button>
        <button
          className={style.buttonNo}
          style={{ fontSize: '16px' }}
          onClick={onClickNo}
        >
          No
        </button>
      </div>
    </>
  );
};

export default DeleteForm;