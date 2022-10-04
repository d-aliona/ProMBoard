import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import Line from '../../ui/Line';
import CloseButton from '../../ui/CloseButton';
import { Preview } from '../../assets/svg/svg-icons';
import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/boardsForm.module.scss';

const ChangeBackgroundBoardForm = ({
  board,
  setShowChangeBackgroundForm,
  setShowDropMenu,
  isOnBoards,
}) => {
  let navigate = useNavigate();
  const [colorBoard, setColorBoard] = useState(board.boardColor);
  const ref = useOutsideClick(() => {
    setShowChangeBackgroundForm(false);
  });

  const changeBackground = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const docRef = doc(db, 'boards', board.id);

    updateDoc(docRef, {
      boardColor: colorBoard,
    }).then(() => {
      if (!isOnBoards) {
        navigate('/auth/board/' + board.id);
      }
      setShowChangeBackgroundForm(false);
      setShowDropMenu(false);
    });
  };

  return (
    <>
      <div className={style.window}>
        <div className={style.boardForm} ref={ref}>
          <div className={style.title}>
            <span className={style.titleName}>Change background</span>
            <CloseButton
              onClick={() => {
                setShowChangeBackgroundForm(false);
              }}
            />
          </div>
          <Line />
          <div
            className={style.previewImage}
            style={{ backgroundColor: `${colorBoard}` }}
          >
            <Preview />
          </div>
          <p>Background</p>
          <div className={style.colourList}>
            <div
              className={style.colourItem}
              style={{ backgroundColor: '#e6a3a3' }}
              onClick={() => setColorBoard('#e6a3a3')}
            ></div>
            <div
              className={style.colourItem}
              style={{ backgroundColor: '#d7c5e2' }}
              onClick={() => setColorBoard('#d7c5e2')}
            ></div>
            <div
              className={style.colourItem}
              style={{ backgroundColor: '#c1ddec' }}
              onClick={() => setColorBoard('#c1ddec')}
            ></div>
            <div
              className={style.colourItem}
              style={{ backgroundColor: '#c1ecd9' }}
              onClick={() => setColorBoard('#c1ecd9')}
            ></div>
            <div
              className={style.colourItem}
              style={{ backgroundColor: '#e7ecc1' }}
              onClick={() => setColorBoard('#e7ecc1')}
            ></div>
            <div
              className={style.colourItem}
              style={{ backgroundColor: '#fbffc7' }}
              onClick={() => setColorBoard('#fbffc7')}
            ></div>
          </div>
          <div>
            <p>
              or choose your colour:
              <input
                type="color"
                defaultValue="#bba896"
                style={{ marginLeft: '10px' }}
                onChange={(e) => {
                  setColorBoard(e.target.value);
                }}
              />
            </p>
          </div>
          <form onSubmit={changeBackground}>
            <button type="submit" className={style.button}>
              Change background
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeBackgroundBoardForm;
