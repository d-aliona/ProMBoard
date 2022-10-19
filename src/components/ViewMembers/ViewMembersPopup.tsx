import React from 'react';
import { useAppSelector } from '../../hooks/hooks';

import ViewOneMember from './ViewOneMember';
import useOutsideClick from '../../hooks/useOutsideClick';
import Initials from '../../ui/Initials';
import Line from '../../ui/Line';
import ShortenTitle from '../../ui/ShortenTitle';
import CloseButton from '../../ui/CloseButton';
import styles from '../../assets/scss/boardsList.module.scss';

interface ViewMembersPopupProps {
  currentBoard: Board;
  setShowMembers?: Dispatcher;
  setShowDropMenuGuest?: Dispatcher;
  isGuestBoard?: boolean;
}

const ViewMembersPopup: React.FC<ViewMembersPopupProps> = ({
  currentBoard,
  setShowMembers,
  setShowDropMenuGuest,
  isGuestBoard,
}) => {
  const users = useAppSelector((state) => state.users.users);
  const ref = useOutsideClick(() => {
    if (isGuestBoard && setShowDropMenuGuest) {
      setShowDropMenuGuest(false);
    } else {
      if (setShowMembers) {
        setShowMembers(false);
      }
    }
  });

  const currentOwner = users.find((member) => member.id === currentBoard.owner)!;

  const handlerClosePopupWindow = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isGuestBoard && setShowDropMenuGuest) {
      setShowDropMenuGuest(false);
    } else {
      if (setShowMembers) {
        setShowMembers(false);
      }
    }
  };

  return (
    <>
      <div className={styles.dropViewMembers} ref={ref}>
        <div className={styles.title}>
          <div className={styles.titleName}>
            Members of the board
            <b style={{ position: 'relative' }}>
              <ShortenTitle
                title={currentBoard.boardTitle}
                number={13}
                pos={'absolute'}
                left={'10px'}
                top={'20px'}
              />
            </b>
          </div>
          <CloseButton onClick={handlerClosePopupWindow} />
        </div>
        <Line width={'99%'} />
        <p className={styles.boardsGroup} style={{ marginBottom: '10px' }}>
          Owner
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
            padding: '0 10px',
          }}
        >
          <Initials user={currentOwner} />
          <span>{currentOwner.firstName + ' ' + currentOwner.lastName}</span>
          <span style={{ marginLeft: '15px', color: '#666' }}>
            {currentOwner.email}
          </span>
        </div>
        <Line width={'96%'} />
        <p className={styles.boardsGroup} style={{ marginBottom: '10px' }}>
          Invited members
        </p>
        <div className={styles.scrollbar}>
          {currentBoard.invitedMembers.length > 0 ? (
            currentBoard.invitedMembers.map((memberID) => {
              const currentMember = users.find((user) => user.id === memberID)!;
              return (
                <ViewOneMember
                  key={memberID}
                  currentBoard={currentBoard}
                  currentMember={currentMember}
                />
              );
            })
          ) : (
            <div style={{ marginLeft: '10px', overflowY: 'hidden' }}>
              There are no invited members
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewMembersPopup;
