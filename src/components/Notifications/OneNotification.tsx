import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

import Initials from '../../ui/Initials';
import ShortenTitle from '../../ui/ShortenTitle';
import { allCardsState } from '../../store/slices/allCardsSlice';
import { allBoardsState } from '../../store/slices/allBoardsSlice';
import styles from '../../assets/scss/topbar.module.scss';

interface OneNotifProps {
  notification: Notification;
}

const OneNotification: React.FC<OneNotifProps> = ({ notification }) => {
  const user = useAppSelector((state) => state.user.user);
  const boards = useAppSelector(allBoardsState);
  const cards = useAppSelector(allCardsState);
  const users = useAppSelector((state) => state.users.users);
  let navigate = useNavigate();
  const currentCard = cards.find((ob) => ob.id === notification?.cardID);
  const cardname = notification.hasOwnProperty('cardTitle')
    ? notification.cardTitle
    : '';
  const curCardTitle = currentCard ? currentCard.cardTitle : cardname;
  const currentBoard = boards.find((ob) => ob.id === notification?.boardID);
  const fromUser = users.find((ob) => ob.id === notification.fromUser)!;
  const color = currentBoard
    ? currentBoard.boardColor
    : notification.boardColor;
  const isReadColor: string = notification.read ? '#ffe' : 'rgba(73, 136, 245, 0.3)';
  const requireNavigation =
    currentBoard &&
    currentBoard.statusOpened &&
    currentBoard.invitedMembers.includes(user.id);

  const handleNavigateBoard = (currentBoard: Board) => {
    if (
      currentBoard.invitedMembers.includes(user.id) ||
      currentBoard.owner === user.id
    ) {
      navigate('/auth/board/' + currentBoard.id);
    }
  };

  return (
    <div style={{ backgroundColor: isReadColor }}>
      <div className={styles.notificationCard}>
        <div
          style={{
            width: '100%',
            backgroundColor: color,
            padding: '10px',
            lineHeight: '1.5',
            cursor: requireNavigation ? 'pointer' : 'auto',
          }}
          onClick={
            requireNavigation
              ? () => handleNavigateBoard(currentBoard)
              : undefined
          }
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <b className={styles.hoverTitle}>
              <ShortenTitle
                title={
                  currentBoard
                    ? currentBoard.boardTitle
                    : notification.boardTitle
                }
                number={28}
              />
            </b>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              width: '100%',
              borderRadius: '3px',
              padding: '6px',
            }}
          >
            {curCardTitle && 
              <ShortenTitle title={curCardTitle} number={28} />}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
          }}
        >
          {fromUser ? (
            <>
              <Initials user={fromUser} size={'30px'} />
              {fromUser.firstName + ' ' + fromUser.lastName}
            </>
          ) : (
            <span>Someone</span>
          )}
        </div>
        <div style={{ paddingLeft: '10px' }}>{notification.text}</div>
        <div
          style={{
            fontSize: '12px',
            display: 'flex',
            justifyContent: 'end',
            padding: '10px 10px 0',
          }}
        >
          {notification.time}
        </div>
      </div>
    </div>
  );
};

export default OneNotification;
