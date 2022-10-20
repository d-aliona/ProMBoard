import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { currentListsState } from '../../store/slices/currentListsSlice';
import CloseButton from '../../ui/CloseButton';
import style from '../../assets/scss/addListForm.module.scss';

interface AddListProps {
  title: string;
  curBoardId: string;
}

const AddListForm: React.FC<AddListProps> = ({title, curBoardId}) => {
  const lists = useAppSelector(currentListsState);
  const [clickAddList, setClickAddList] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [showError, setShowError] = useState(false);
  const disabled = listTitle ? '' : style.disabled;

  const addList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!lists) {
      setShowError(false);
      addListToDatabase();
    } else {
      if (lists.some((el) => el.listTitle === listTitle)) {
        setShowError(true);
      } else {
        addListToDatabase();
        setShowError(false);
      }
    }
  };

  const addListToDatabase = async () => {
    const listsCol = collection(db, 'lists');

    await addDoc(listsCol, {
      listTitle: listTitle,
      boardID: curBoardId,
      position: lists.length ? lists.length + 1 : 1,
    }).catch((err) => {
      console.error(err);
    });

    setListTitle('');
    setClickAddList(false);
    setShowError(false);
  };

  const cancel = () => {
    setClickAddList(false);
    setListTitle('');
    setShowError(false);
  };

  return (
    <>
      {clickAddList && (
        <form className={style.addForm} onSubmit={addList}>
          <input
            className={style.inputTitle}
            type="text"
            placeholder="Enter list title"
            value={listTitle}
            onChange={(e) => {
              setListTitle(e.target.value);
            }}
            autoFocus
            required
          />
          {!!showError && (
            <div className={style.error}>
              The list with such a title already exists. Please enter another
              title.
            </div>
          )}
          <div className={style.actions}>
            <button className={`${style.action} ${disabled}`} type="submit">
              Add list
            </button>
            <div
              style={{
                marginLeft: 'auto',
                borderRadius: '4px',
                backgroundColor: '#ffe',
              }}
            >
              <CloseButton onClick={cancel} />
            </div>
          </div>
        </form>
      )}
      {!clickAddList && (
        <div
          className={style.addList}
          onClick={() => setClickAddList((prev) => !prev)}
        >
          <span className={style.plus}>+</span>
          {title}
        </div>
      )}
    </>
  );
};

export default AddListForm;
