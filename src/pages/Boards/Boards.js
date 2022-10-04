import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import OneBoardOnBoards from '../../components/OneBoardOnBoards';
import CreateBoardForm from '../../features/CreateBoardForm';
import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import { notPersonalBoardsState } from '../../store/slices/notPersonalBoardsSlice';
import ViewClosedBoards from '../../features/ViewClosedBoards';
import Input from '../../ui/Input';
import style from '../../assets/scss/home.module.scss';

const Boards = () => {
  const user = useSelector((state) => state.user.user);
  const [showCreateBoardForm, setShowCreateBoardForm] = useState(false);
  const [showViewClosedBoards, setShowViewClosedBoards] = useState(false);
  const [searchBoard, setSearchBoard] = useState('');
  const [personalBoardsList, setPersonalBoardsList] = useState([]);
  const [guestBoardsList, setGuestBoardsList] = useState([]);
  const boards = useSelector(personalBoardsState);
  const notUserBoards = useSelector(notPersonalBoardsState);
  const guestBoards =
    notUserBoards && notUserBoards.length > 0
      ? notUserBoards.filter((board) => board.invitedMembers.includes(user.id))
      : [];
  let navigate = useNavigate();
  const tempArr = [...boards];

  useEffect(() => {
    const persBoardsArr = tempArr.filter((board) => {
      if (searchBoard !== '') {
        if (
          board.boardTitle.toLowerCase().includes(searchBoard.toLowerCase())
        ) {
          return board;
        }
      } else {
        return board;
      }
    });
    setPersonalBoardsList(persBoardsArr);

    const guestBoardsArr = guestBoards.filter((board) => {
      if (searchBoard !== '') {
        if (
          board.boardTitle.toLowerCase().includes(searchBoard.toLowerCase())
        ) {
          return board;
        }
      } else {
        return board;
      }
    });
    setGuestBoardsList(guestBoardsArr);
  }, [searchBoard, boards]);

  return (
    <>
      <div className={style.head}>
        <p className={style.title}>Boards</p>
        <div
          className={style.createBoard}
          onClick={(e) => {
            setShowCreateBoardForm((prev) => !prev);
            e.stopPropagation();
          }}
        >
          Create your board
        </div>
        <div
          className={style.viewClosedBoards}
          onClick={(e) => {
            setShowViewClosedBoards((prev) => !prev);
            e.stopPropagation();
          }}
        >
          View closed boards
        </div>
        <div className={style.searchField}>
          <Input
            pad={'30px'}
            type={'text'}
            placeholder={'Search boards'}
            value={searchBoard}
            onChange={(e) => {
              setSearchBoard(e.target.value);
            }}
          />
        </div>
      </div>
      {showCreateBoardForm && (
        <div>
          <CreateBoardForm setShowCreateBoardForm={setShowCreateBoardForm} />
        </div>
      )}
      {showViewClosedBoards && (
        <div>
          <ViewClosedBoards setShowViewClosedBoards={setShowViewClosedBoards} />
        </div>
      )}
      <div className={style.line1}></div>
      <div className={style.boardsGroup}>
        <div style={{ display: 'flex' }}>
          <h2 className={style.boardgroupTitle}>Personal boards</h2>
          <div className={style.statistics}>
            Showing <b>{personalBoardsList.length}</b> of <b>{boards.length}</b>{' '}
            boards
          </div>
        </div>
        <div className={style.boards}>
          {personalBoardsList &&
            personalBoardsList.map((board) => (
              <OneBoardOnBoards
                key={board.id}
                board={board}
                isGuestBoard={false}
              />
            ))}
          {boards.length === 0 && (
            <div style={{ fontSize: '16px' }}>You have no personal boards</div>
          )}
          {personalBoardsList.length === 0 && boards.length > 0 && (
            <div style={{ fontSize: '16px' }}>
              No boards named '{searchBoard}' have been found
            </div>
          )}
        </div>
      </div>
      <div className={style.boardsGroup}>
        <div style={{ display: 'flex' }}>
          <h2 className={style.boardgroupTitle}>Guest boards</h2>
          <div className={style.statistics}>
            Showing <b>{guestBoardsList.length}</b> of{' '}
            <b>{guestBoards.length}</b> boards
          </div>
        </div>

        <div className={style.boards} style={{ maxHeight: '20vh' }}>
          {guestBoardsList &&
            guestBoardsList.map((board) => (
              <OneBoardOnBoards
                key={board.id}
                board={board}
                isGuestBoard={true}
              />
            ))}
          {guestBoards.length === 0 && (
            <div style={{ fontSize: '16px' }}>You have no guest boards</div>
          )}
          {guestBoardsList.length === 0 && guestBoards.length > 0 && (
            <div style={{ fontSize: '16px' }}>
              No boards named '{searchBoard}' have been found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Boards;
