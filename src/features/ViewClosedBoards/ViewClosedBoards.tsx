import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { allBoardsState } from '../../store/slices/allBoardsSlice';
import Line from '../../ui/Line';
import CloseButton from '../../ui/CloseButton';
import useOutsideClick from '../../hooks/useOutsideClick';
import OneClosedBoard from './OneClosedBoard';
import style from '../../assets/scss/boardsForm.module.scss';
import styles from '../../assets/scss/boardsList.module.scss';

const ViewClosedBoards: React.FC<SetStateProps> = ({ setShowViewClosedBoards }) => {
  const user = useAppSelector((state) => state.user.user);
  const boards = useAppSelector(allBoardsState);
  const [closedBoards, setClosedBoards] = useState<Boards>([]);
  const ref = useOutsideClick(() => {
    setShowViewClosedBoards(false);
  });

  useEffect(() => {
    const data = [...boards];
    const changedData = data.filter(
      (el) => el.owner === user.id && el.statusOpened === false
    );
    setClosedBoards([...changedData]);
  }, [boards]);

  return (
    <>
      <div className={style.window}>
        <div
          className={style.boardForm}
          style={{ maxWidth: '560px' }}
          ref={ref}
        >
          <div className={style.title}>
            <span className={style.titleName}>Closed boards</span>
            <CloseButton
              onClick={() => {
                setShowViewClosedBoards(false);
              }}
            />
          </div>
          <Line />
          <div className={styles.scrollbar}>
            {closedBoards.length > 0 ? (
              closedBoards.map((board) => {
                return <OneClosedBoard key={board.id} currentBoard={board} />;
              })
            ) : (
              <div style={{ marginLeft: '10px', overflowY: 'hidden' }}>
                You have no closed boards
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewClosedBoards;
