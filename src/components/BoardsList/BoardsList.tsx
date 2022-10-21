import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import { notPersonalBoardsState } from '../../store/slices/notPersonalBoardsSlice';
import { TickDown } from '../../assets/svg/svg-icons';
import useOutsideClick from '../../hooks/useOutsideClick';
import CloseButton from '../../ui/CloseButton';
import Line from '../../ui/Line';
import ShortenTitle from '../../ui/ShortenTitle';
import useWindowSize from '../../hooks/useWindowSize';
import style from '../../assets/scss/boardsList.module.scss';

const BoardsList: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const boards = useAppSelector(personalBoardsState);
  const notUserBoards = useAppSelector(notPersonalBoardsState);
  const [show, setShow] = useState(false);
  const ref = useOutsideClick(() => setShow(false));
  let navigate = useNavigate();
  const size = useWindowSize();
  const guestBoards =
    notUserBoards && notUserBoards.length > 0
      ? notUserBoards.filter((board) => board.invitedMembers.includes(user.id))
      : [];

  const navigateBoard = (boardID: string) => {
    navigate('/auth/board/' + boardID);
    setShow(false);
  };

  const toggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShow((prev) => !prev);
    e.stopPropagation();
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div className={style.head} onClick={toggle}>
          Boards <TickDown />
        </div>
        {show && (
          <div className={style.dropBoardsList} ref={ref}>
            <div className={style.title}>
              <span className={style.titleName}>Your boards</span>
              <CloseButton onClick={() => setShow(false)} />
            </div>
            <Line width={'96%'} />
            <div className={style.scrollbar}>
              <p className={style.boardsGroup}>Personal boards</p>
              {boards &&
                boards.map((board) => (
                  <div
                    key={board.id}
                    className={style.listItem}
                    onClick={() => navigateBoard(board.id)}
                  >
                    <div
                      className={style.colorBoard}
                      style={{ backgroundColor: `${board.boardColor}` }}
                    ></div>
                    <ShortenTitle
                      title={board.boardTitle}
                      number={size.width > 500 ? 40 : 20}
                    />
                  </div>
                ))}
              {guestBoards.length > 0 && (
                <>
                  <Line width={'90%'} />
                  <p className={style.boardsGroup}>Guest boards</p>
                </>
              )}
              {guestBoards &&
                guestBoards.map((board) => (
                  <div
                    key={board.id}
                    className={style.listItem}
                    onClick={() => navigateBoard(board.id)}
                  >
                    <div
                      className={style.colorBoard}
                      style={{ backgroundColor: `${board.boardColor}` }}
                    ></div>
                    <ShortenTitle
                      title={board.boardTitle}
                      number={size.width > 500 ? 40 : 20}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BoardsList;
