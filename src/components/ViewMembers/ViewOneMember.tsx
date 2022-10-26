import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { addNotificationToDataBase } from '../../features/exportFunctions';
import { currentCardsState } from '../../store/slices/currentCardsSlice';
import { currentListsState } from '../../store/slices/currentListsSlice';
import Initials from '../../ui/Initials';
import CloseButton from '../../ui/CloseButton';
import ShortenTitle from '../../ui/ShortenTitle';
import useWindowSize from '../../hooks/useWindowSize';
import style from '../../assets/scss/board.module.scss';
import DeleteForm from '../../ui/DeleteForm';

interface ViewOneMemberProps {
  currentBoard: Board;
  currentMember: User;
}

type StrArr = [string, string, string][];

const ViewOneMember: React.FC<ViewOneMemberProps> = ({
  currentBoard,
  currentMember,
}) => {
  const user = useAppSelector((state) => state.user.user);
  const cards = useAppSelector(currentCardsState);
  const lists = useAppSelector(currentListsState);
  const [clickRemove, setClickRemove] = useState(false);
  const [attachedToCards, setAttachedToCards] = useState<StrArr>([]);
  const isPersonalBoard = user.id === currentBoard.owner;
  const size = useWindowSize();

  useEffect(() => {
    const data: StrArr = [];
    cards &&
      cards.map((card) => {
        const tempArray = [...card.assignedUsers];

        if (tempArray.includes(currentMember.id!)) {
          data.push([card.listID, card.cardTitle, card.id]);
        }
      });
    setAttachedToCards(data);
  }, [cards]);

  const removeMemberFromBoard = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const dataBoard = [...currentBoard.invitedMembers];
    const changedDataBoard = dataBoard.filter((id) => id !== currentMember.id);
    const docRef = doc(db, 'boards', currentBoard.id);
    await updateDoc(docRef, {
      invitedMembers: [...changedDataBoard],
    });

    const dataUser = [...currentMember.guestBoards];
    const changedDataUser = dataUser.filter((id) => id !== currentBoard.id);
    const doccRef = doc(db, 'users', currentMember.id!);
    await updateDoc(doccRef, {
      guestBoards: [...changedDataUser],
    });
    const ob = {
      memberID: currentMember.id!,
      userID: user.id!,
      text: 'removed you from this board',
      boardTitle: currentBoard.boardTitle,
      boardColor: currentBoard.boardColor,
    };
    addNotificationToDataBase(ob);
  };

  const confirmRemoveMemberFromBoard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    attachedToCards &&
      attachedToCards.map(async (item) => {
        const curCard = cards.find((ob) => ob.id === item[2])!;
        const data = [...curCard.assignedUsers];
        const changedData = data.filter((id) => id !== currentMember.id);
        const docRef = doc(db, 'cards', curCard.id);
        await updateDoc(docRef, {
          assignedUsers: [...changedData],
        });
      });
    removeMemberFromBoard(e);
  };

  return (
    <>
      <div className={style.viewMember}>
        <Initials user={currentMember} />
        <span>{currentMember.firstName + ' ' + currentMember.lastName}</span>
        {size.width > 550 && (
          <span style={{ marginLeft: '15px', color: '#666' }}>
            {currentMember.email}
          </span>
        )}
        {isPersonalBoard ? (
          <div className={style.removeMemFromBoardButWrapper}>
            <CloseButton
              onClick={(e) =>
                attachedToCards.length === 0
                  ? removeMemberFromBoard(e)
                  : setClickRemove(!clickRemove)
              }
            />
          </div>
        ) : null}
      </div>
      {clickRemove ? (
        <div style={{ width: '70%', margin: 'auto' }}>
          <span>
            <b>{currentMember.firstName + ' ' + currentMember.lastName}</b>
          </span>{' '}
          is attached to such cards:
          <div>
            {attachedToCards &&
              attachedToCards.map((item) => {
                const curList = lists.find((ob) => ob.id === item[0])!;
                return (
                  <div
                    key={item[2]}
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      gap: '10px',
                      paddingLeft: '10px',
                      position: 'relative',
                    }}
                  >
                    <b>
                      <ShortenTitle
                        title={item[1]}
                        number={15}
                        pos={'absolute'}
                        left={'10px'}
                        top={'20px'}
                      />
                    </b>
                    (
                    <ShortenTitle
                      title={curList.listTitle}
                      number={15}
                      pos={'absolute'}
                      left={'10px'}
                      top={'20px'}
                    />
                    )
                  </div>
                );
              })}
          </div>
          <div>
            <DeleteForm
              text={
                'Remove from this board anyway and cancel attachment to all of these cards?'
              }
              onClickYes={confirmRemoveMemberFromBoard}
              onClickNo={(e) => {
                setClickRemove(false);
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ViewOneMember;
