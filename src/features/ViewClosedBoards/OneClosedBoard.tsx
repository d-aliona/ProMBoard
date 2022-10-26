import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { addNotificationToDataBase } from '../exportFunctions';
import { allCardsState } from '../../store/slices/allCardsSlice';
import { allListsState } from '../../store/slices/allListsSlice';
import ShortenTitle from '../../ui/ShortenTitle';
import Button from '../../ui/Button';
import useWindowSize from '../../hooks/useWindowSize';
import style from '../../assets/scss/boardsList.module.scss';
import DeleteForm from '../../ui/DeleteForm';

interface OneClosedBoardProps {
  currentBoard: Board;
}

const OneClosedBoard: React.FC<OneClosedBoardProps> = ({ currentBoard }) => {
  const user = useAppSelector((state) => state.user.user);
  const users = useAppSelector((state) => state.users.users);
  const cards = useAppSelector(allCardsState);
  const lists = useAppSelector(allListsState);
  const [clickRemove, setClickRemove] = useState(false);
  const size = useWindowSize();

  const reopenBoard = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const docRef = doc(db, 'boards', currentBoard.id);
    await updateDoc(docRef, {
      statusOpened: true,
    });
    if (currentBoard.invitedMembers.length > 0) {
      currentBoard.invitedMembers.forEach((id) => {
        const ob = {
          memberID: id,
          userID: user.id!,
          text: 'reopened this board',
          boardID: currentBoard.id,
          boardTitle: currentBoard.boardTitle,
          boardColor: currentBoard.boardColor,
        };
        addNotificationToDataBase(ob);
      });
    }
  };

  const confirmDeleteBoard = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    cards.forEach(async (card) => {
      if (card.boardID === currentBoard.id) {
        await deleteDoc(doc(db, 'cards', card.id));
      }
    });

    lists
      .filter((el) => el.boardID === currentBoard.id)
      .forEach(async (el) => await deleteDoc(doc(db, 'lists', el.id)));

    users.forEach(async (member) => {
      if (member.guestBoards.length > 0) {
        const tempArray = [...member.guestBoards];
        if (tempArray.includes(currentBoard.id)) {
          const dataUser = [...member.guestBoards];
          const changedDataUser = dataUser.filter(
            (id) => id !== currentBoard.id
          );
          const doccRef = doc(db, 'users', member.id!);

          await updateDoc(doccRef, {
            guestBoards: [...changedDataUser],
          });
          const ob = {
            memberID: member.id!,
            userID: user.id!,
            text: 'deleted this board',
            boardTitle: currentBoard.boardTitle,
            boardColor: currentBoard.boardColor,
          };
          addNotificationToDataBase(ob);
        }
      }
    });
    await deleteDoc(doc(db, 'boards', currentBoard.id));
  };

  return (
    <>
      <div
        className={style.listItem}
        style={{ padding: '4px', cursor: 'auto' }}
      >
        <div
          className={style.colorBoard}
          style={{ backgroundColor: `${currentBoard.boardColor}` }}
        ></div>
        <ShortenTitle title={currentBoard.boardTitle} number={25} />
        {!clickRemove && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <Button
              title={'Reopen'}
              back={'rgba(23, 43, 34, .1)'}
              hover={'rgba(23, 43, 34, 1)'}
              onClick={reopenBoard}
            />
            <Button
              title={'Delete'}
              back={'rgba(129, 3, 3, .1)'}
              hover={'rgb(129, 3, 3)'}
              onClick={(e) => {
                e.stopPropagation();
                setClickRemove(true);
              }}
            />
          </div>
        )}
        {clickRemove ? (
          <div
            style={{
              width: size.width < 550 ? '60%' : '35%',
              marginLeft: 'auto',
            }}
          >
            <DeleteForm 
              text={`All lists, cards will be deleted on this  board. Delete board?`}
              onClickYes={confirmDeleteBoard}
              onClickNo={(e) => {
                setClickRemove(false);
                e.stopPropagation();
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default OneClosedBoard;
