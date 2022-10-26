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
        <div>
          <button
            className={style.buttonYes}
            onClick={onClickYes}
          >
            Yes
          </button>
          <button
            className={style.buttonNo}
            onClick={onClickNo}
          >
            No
          </button>
        </div>      
      </div>
    </>
  );
};

export default DeleteForm;