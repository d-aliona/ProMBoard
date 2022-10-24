import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { allBoardsState } from '../../store/slices/allBoardsSlice';
import { addNotificationToDataBase } from '../exportFunctions';
import Input from '../../ui/Input';
import useOutsideClick from '../../hooks/useOutsideClick';
import Initials from '../../ui/Initials';
import CloseButton from '../../ui/CloseButton';
import Line from '../../ui/Line';
import style from '../../assets/scss/inviteMembers.module.scss';
import styles from '../../assets/scss/boardsList.module.scss';
import useWindowSize from '../../hooks/useWindowSize';

interface AssignMemProps {
  card: Card;
  setClickAddMembers: Dispatcher;
}

const AssignMemberForm: React.FC<AssignMemProps> = ({ card, setClickAddMembers }) => {
  const user = useAppSelector((state) => state.user.user);
  const users = useAppSelector((state) => state.users.users);
  const boards = useAppSelector(allBoardsState);
  const [searchMember, setSearchMember] = useState('');
  const size = useWindowSize();
  const currentBoard = boards.find((ob) => ob.id === card.boardID)!;
  const membersToBeAssigned = [
    ...currentBoard?.invitedMembers,
    currentBoard.owner,
  ];
  const [dropMemberList, setDropMemberList] = useState(membersToBeAssigned);
  const ref = useOutsideClick(() => {
    setClickAddMembers(false);
    setSearchMember('');
  });

  useEffect(() => {
    const list = membersToBeAssigned.filter((memberID) => {
      if (searchMember !== '') {
        const member = users.find((ob) => ob.id === memberID)!;
        if (searchMember) {
          if (
            (
              member.firstName.toLowerCase() + member.lastName.toLowerCase()
            ).includes(searchMember.toLowerCase()) ||
            member.email!.includes(searchMember)
          ) {
            return member;
          }
        }
      } else return memberID;
    });
    setDropMemberList(list);
  }, [searchMember]);

  const toggleAssignMember = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, memberID: string) => {
    e.stopPropagation();

    if (card.assignedUsers.includes(memberID)) {
      const data = [...card.assignedUsers];
      const changedData = data.filter((id) => id !== memberID);

      const docRef = doc(db, 'cards', card.id);
      await updateDoc(docRef, {
        assignedUsers: [...changedData],
      });
      if (user.id !== memberID) {
        const ob = {
          memberID: memberID,
          userID: user.id!,
          text: 'removed you from this card',
          boardTitle: currentBoard.boardTitle,
          boardColor: currentBoard.boardColor,
          cardTitle: card.cardTitle,
        };
        addNotificationToDataBase(ob);
      }
    } else {
      const docRef = doc(db, 'cards', card.id);
      await updateDoc(docRef, {
        assignedUsers: [...card.assignedUsers, memberID],
      });
      if (user.id !== memberID) {
        const ob = {
          memberID: memberID,
          userID: user.id!,
          text: 'added you to this card',
          cardID: card.id,
          boardID: card.boardID,
          boardTitle: currentBoard.boardTitle,
          boardColor: currentBoard.boardColor,
          cardTitle: card.cardTitle,
        };
        addNotificationToDataBase(ob);
      }
    }
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className={style.assignMembersWindow} ref={ref}>
          <div className={styles.title} style={{ padding: '0' }}>
            <span className={styles.titleName}>Assign members</span>
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                setClickAddMembers(false);
              }}
            />
          </div>
          <Line />
          <Input
            type={'text'}
            placeholder={'Search member'}
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
          />
          <p className={styles.boardsGroup} style={{ marginBottom: '10px' }}>
            Board members
          </p>
          <div className={style.dropAsignMembersList}>
            {dropMemberList &&
              dropMemberList.map((memberID) => {
                const currentMember = users.find((ob) => ob.id === memberID)!;
                return (
                  <div
                    key={memberID}
                    className={style.memberToAssign}
                    onClick={(e) => toggleAssignMember(e, memberID)}
                  >
                    <Initials user={currentMember} />
                    {currentMember.firstName + ' ' + currentMember.lastName}
                    <span style={{ marginLeft: '15px', color: '#666' }}>
                      {size.width > 590 ? currentMember.email : null}
                    </span>
                    {card.assignedUsers.includes(memberID) ? (
                      <span style={{ marginLeft: 'auto' }}>✓</span>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignMemberForm;
