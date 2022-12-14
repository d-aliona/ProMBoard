import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import Input from '../../ui/Input';
import Line from '../../ui/Line';
import CloseButton from '../../ui/CloseButton';
import { Preview } from '../../assets/svg/svg-icons';
import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/boardsForm.module.scss';

const CreateBoardForm: React.FC<SetStateProps> = ({ setShowCreateBoardForm }) => {
  let navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [colorBoard, setColorBoard] = useState('#e6a3a3');
  const [showError, setShowError] = useState(false);
  const disabled: string = title ? '' : style.disabled;
  const user = useAppSelector((state) => state.user.user);
  const boards = useAppSelector(personalBoardsState);

  const ref = useOutsideClick(() => {
    setShowCreateBoardForm(false);
  });
  const createBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!boards) {
      createBoardInDatabase();
    } else {
      if (boards.some((el) => el.boardTitle === title)) {
        setShowError(true);
      } else {
        createBoardInDatabase();
      }
    }
  };

  const createBoardInDatabase = () => {
    const colRef = collection(db, 'boards');

    addDoc(colRef, {
      boardTitle: title,
      boardColor: colorBoard,
      owner: user.id,
      statusOpened: true,
      invitedMembers: [],
    })
      .then((docRef) => {
        navigate('/auth/board/' + docRef.id);
        setShowCreateBoardForm(false);
        setShowError(false);
        setTitle('');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      <div className={style.window}>
        <div className={style.boardForm} ref={ref}>
          <div className={style.title}>
            <span className={style.titleName}>Create a board</span>
            <CloseButton
              onClick={() => {
                setShowCreateBoardForm(false);
                setShowError(false);
                setTitle('');
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
                defaultValue="#eedfaa"
                className={style.inputColor}
                onChange={(e) => {
                  setColorBoard(e.target.value);
                }}
              />
            </p>
          </div>
          <p style={{ marginTop: '20px' }}>Board title</p>
          <form onSubmit={createBoard}>
            <Input
              type={'text'}
              placeholder={'Enter board title'}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {showError && (
              <div className={style.error}>
                The board with such a title already exists. Please enter another
                title.
              </div>
            )}
            <button type="submit" className={`${style.button} ${disabled}`}>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBoardForm;
