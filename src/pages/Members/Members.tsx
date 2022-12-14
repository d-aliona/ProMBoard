import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import Input from '../../ui/Input';
import useWindowSize from '../../hooks/useWindowSize';
import ShortenTitle from '../../ui/ShortenTitle';
import style from '../../assets/scss/home.module.scss';
import styles from '../../assets/scss/sidebar.module.scss';

const Members: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const users = useAppSelector((state) => state.users.users);
  const [searchMem, setSearchMem] = useState('');
  const boards = useAppSelector(personalBoardsState);
  const size = useWindowSize();
  let navigate = useNavigate();
  let countMembers = 0;
  let setMembers = new Set<string>();

  boards.forEach((board) => {
    if (board.invitedMembers.length > 0) {
      board.invitedMembers.forEach((el) => setMembers.add(el));
    }
  });
  const membersIDs = Array.from(setMembers);

  return (
    <>
      <div className={style.header}>
        <p className={style.title}>Members</p>
        {membersIDs.length !== 0 && (
          <div className={style.searchField}>
            <Input
              pad={'30px'}
              type={'text'}
              placeholder={'Search members'}
              value={searchMem}
              onChange={(e) => {
                setSearchMem(e.target.value);
              }}
            />
          </div>
        )}
      </div>
      <div className={style.line1} style={{ marginTop: '0' }}></div>
      <div
        className={styles.scrollbar}
        style={{ maxHeight: `calc(100vh - 180px)` }}
      >
        {membersIDs &&
          membersIDs.map((id) => {
            const member = users.find((el) => el.id === id)!;
            let memberToDisplay = false;
            if (searchMem !== '') {
              if (
                (
                  member.firstName.toLowerCase() + member.lastName.toLowerCase()
                ).includes(searchMem.toLowerCase()) ||
                member.email!.includes(searchMem)
              ) {
                memberToDisplay = true;
                countMembers += 1;
              }
            } else {
              memberToDisplay = true;
            }
            const memberBoards = memberToDisplay
              ? member?.guestBoards.filter(
                  (el) =>
                    boards.filter((board) => board.id === el)[0]?.owner ===
                    user.id
                )
              : null;

            return (
              memberToDisplay && (
                <div className={style.boardsGroup} key={id}>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <h2 className={style.boardgroupTitle}>
                      {member.firstName} {member.lastName}
                      <span
                        style={{
                          color: '#666',
                          fontSize: '14px',
                          marginLeft: '20px',
                        }}
                      >
                        {' '}
                        {member.email}
                      </span>
                    </h2>
                    <div className={style.statistics}>
                      is invited to <b>{memberBoards && memberBoards.length}</b> boards
                    </div>
                  </div>
                  <div
                    style={{
                      margin: size.width < 500 ? '10px' : '10px 40px 18px',
                    }}
                  >
                    {memberBoards &&
                      memberBoards.map((boardID) => {
                        const curBoard = boards.find((el) => el.id === boardID)!;
                        return (
                          <div key={boardID}>
                            <div
                              className={style.boardItemOnMembers}
                              onClick={() => navigate('/auth/board/' + boardID)}
                            >
                              <div
                                className={style.colorBoard}
                                style={{
                                  backgroundColor: `${curBoard.boardColor}`,
                                }}
                              ></div>
                              <ShortenTitle
                                title={curBoard.boardTitle}
                                number={size.width < 550 ? 25 : 50}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )
            );
          })}
        {countMembers === 0 && searchMem !== '' && (
          <div style={{ fontSize: '16px', marginLeft: '40px' }}>
            No members named '{searchMem}' have been found
          </div>
        )}
        {membersIDs.length === 0 && (
          <div style={{ fontSize: '16px', marginLeft: '40px' }}>
            No members have been invited to your personal boards
          </div>
        )}
      </div>
    </>
  );
};

export default Members;
