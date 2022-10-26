import React from 'react';

import style from '../../assets/scss/ui.module.scss';

interface SaveCancelProps {
  isDisabled?: boolean;
  onClickSave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SaveCancelButtons: React.FC<SaveCancelProps> = ({ isDisabled, onClickSave, onClickCancel }) => {
  
  return (
    <>
      <button
        className={style.buttonTrue}
        disabled={isDisabled}
        onClick={onClickSave}
      >
        Save
      </button>
      <button className={style.buttonCancel} onClick={onClickCancel}>
        Cancel
      </button>
    </>
  );
};

export default SaveCancelButtons;