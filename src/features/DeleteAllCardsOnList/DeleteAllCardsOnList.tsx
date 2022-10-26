import React from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import { addNotificationToDataBase } from '../exportFunctions';
import DeleteForm from '../../ui/DeleteForm';

interface DeleteListProps {
  list: List;
  cardsOnCurList: Cards;
  setMessageDeleteAllCards: Dispatcher;
  setShowMenu: Dispatcher;
}

const DeleteAllCardsOnList: React.FC<DeleteListProps> = ({
  list,
  cardsOnCurList,
  setMessageDeleteAllCards,
  setShowMenu,
}) => {
  const user = useAppSelector((state) => state.user.user);
  const persBoards = useAppSelector(personalBoardsState);
  const currentBoard = persBoards.find((ob) => ob.id === list.boardID)!;

  const deleteAllCards = async () => {
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
    
    setMessageDeleteAllCards(false);
    setShowMenu(false);
  };

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setMessageDeleteAllCards(false);
  };

  return (
    <div style={{ margin: '0 10px' }}>
      <DeleteForm 
        text={'Delete all cards on this list?'}
        onClickYes={deleteAllCards}
        onClickNo={cancel}
      />
    </div>
  );
};

export default DeleteAllCardsOnList;
