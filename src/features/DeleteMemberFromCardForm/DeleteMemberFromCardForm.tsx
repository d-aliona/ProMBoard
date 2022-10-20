import React from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { addNotificationToDataBase } from '../exportFunctions';
import { allBoardsState } from '../../store/slices/allBoardsSlice';
import Initials from '../../ui/Initials';
import CloseButton from '../../ui/CloseButton';
import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/deleteForm.module.scss';

interface DelMemProps {
  card: Card;
  memberID: string;
  currentMember: User;
  setShowDeleteMemberForm: Dispatcher;
}

const DeleteMemberFromCardForm: React.FC<DelMemProps> = ({
  card,
  memberID,
  currentMember,
  setShowDeleteMemberForm,
}) => {
  const user = useAppSelector((state) => state.user.user);
  const boards = useAppSelector(allBoardsState);
  const ref = useOutsideClick(() => {
    setShowDeleteMemberForm(false);
  });

  const removeMember = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDeleteMemberForm(false);

    const data = [...card.assignedUsers];
    const changedData = data.filter((id) => id !== memberID);

    const docRef = doc(db, 'cards', card.id);
    await updateDoc(docRef, {
      assignedUsers: [...changedData],
    });

    const currentBoard = boards.find((ob) => ob.id === card.boardID)!;
    if (user.id !== currentMember.id) {
      const ob = {
        memberID: currentMember.id,
        userID: user.id,
        text: 'removed you from this card',
        boardTitle: currentBoard.boardTitle,
        boardColor: currentBoard.boardColor,
        cardTitle: card.cardTitle,
      };
      addNotificationToDataBase(ob);
    }
  };

  return (
    <>
      <div className={style.deleteMemberOnCardForm} ref={ref}>
        <div className={style.memberInfo}>
          <Initials user={currentMember} />
          <div>
            <p>{currentMember.firstName + ' ' + currentMember.lastName}</p>
            <p>{currentMember.email}</p>
          </div>
          <div style={{ position: 'absolute', right: '0px', top: '0px' }}>
            <CloseButton
              border={'1px solid transparent'}
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteMemberForm(false);
              }}
            />
          </div>
        </div>
        <hr className={style.line} />
        <div className={style.removeMember} onClick={removeMember}>
          Remove from card
        </div>
      </div>
    </>
  );
};

export default DeleteMemberFromCardForm;
