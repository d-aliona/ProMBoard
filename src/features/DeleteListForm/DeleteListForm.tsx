import React from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import { currentListsState } from '../../store/slices/currentListsSlice';
import { addNotificationToDataBase } from '../exportFunctions';
import style from '../../assets/scss/deleteForm.module.scss';

interface DeleteListProps {
  list: List;
  cardsOnCurList: Cards;
  listWillbeDeleted: boolean;
  setMessageDeleteList?: Dispatcher; 
  setMessageDeleteAllCards?: Dispatcher;
  setShowMenu: Dispatcher;
}

const DeleteListForm: React.FC<DeleteListProps> = ({
  list,
  cardsOnCurList,
  listWillbeDeleted,
  setMessageDeleteList,
  setMessageDeleteAllCards,
  setShowMenu,
}) => {
  const user = useAppSelector((state) => state.user.user);
  const persBoards = useAppSelector(personalBoardsState);
  const noCards = cardsOnCurList.length === 0;
  const lists = useAppSelector(currentListsState);
  const currentBoard = persBoards.find((ob) => ob.id === list.boardID)!;

  const deleteList = async () => {
    if (!noCards) {
      cardsOnCurList.forEach(async (el) => {
        el.assignedUsers.forEach((idn) => {
          if (user.id !== idn) {
            const ob = {
              memberID: idn,
              userID: user.id,
              text: 'deleted this card',
              boardTitle: currentBoard.boardTitle,
              boardColor: currentBoard.boardColor,
              cardTitle: el.cardTitle,
            };
            addNotificationToDataBase(ob);
          }
        });
        await deleteDoc(doc(db, 'cards', el.id));
      });
    }
    if (listWillbeDeleted) {
      lists.forEach(async (el) => {
        if (el.position > list.position) {
          const docRef = doc(db, 'lists', el.id);

          await updateDoc(docRef, {
            position: el.position - 1,
          });
        }
      });

      await deleteDoc(doc(db, 'lists', list.id));
    }
    listWillbeDeleted
      ? setMessageDeleteList && setMessageDeleteList(false)
      : setMessageDeleteAllCards && setMessageDeleteAllCards(false);
    setShowMenu(false);
  };

  const clickButtonNo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    listWillbeDeleted
      ? setMessageDeleteList && setMessageDeleteList(false)
      : setMessageDeleteAllCards && setMessageDeleteAllCards(false);
  };

  return (
    <>
      <div className={style.deleteCardForm} style={{ margin: '0 10px' }}>
        {listWillbeDeleted ? (
          noCards ? (
            <span>Delete this list?</span>
          ) : (
            <span>Delete this list with all cards on it?</span>
          )
        ) : (
          ''
        )}
        {!listWillbeDeleted ? (
          !noCards ? (
            <span>Delete all cards on this list?</span>
          ) : (
            ''
          )
        ) : (
          ''
        )}
        <div>
          <button
            className={style.buttonYes}
            style={{ fontSize: '16px' }}
            onClick={deleteList}
          >
            Yes
          </button>
          <button
            className={style.buttonNo}
            style={{ fontSize: '16px' }}
            onClick={clickButtonNo}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteListForm;