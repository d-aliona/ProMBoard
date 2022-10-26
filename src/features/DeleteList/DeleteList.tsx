import React from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import { currentListsState } from '../../store/slices/currentListsSlice';
import { addNotificationToDataBase } from '../exportFunctions';
import DeleteForm from '../../ui/DeleteForm';

interface DeleteListProps {
  list: List;
  cardsOnCurList: Cards;
  setMessageDeleteList: Dispatcher; 
  setShowMenu: Dispatcher;
}

const DeleteList: React.FC<DeleteListProps> = ({
  list,
  cardsOnCurList,
  setMessageDeleteList,
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
              userID: user.id!,
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
      lists.forEach(async (el) => {
        if (el.position > list.position) {
          const docRef = doc(db, 'lists', el.id);

          await updateDoc(docRef, {
            position: el.position - 1,
          });
        }
      });

      await deleteDoc(doc(db, 'lists', list.id));
    setMessageDeleteList(false);
    setShowMenu(false);
  };

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setMessageDeleteList(false);
  };

  return (
    <div style={{ margin: '0 10px' }}>
      <DeleteForm 
        text={noCards ? 'Delete this list?' : 'Delete this list with all cards on it?'}
        onClickYes={deleteList}
        onClickNo={cancel}
      />
    </div>
  );
};

export default DeleteList;
