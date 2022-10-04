import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import useOutsideClick from '../../hooks/useOutsideClick';
import ViewMembersPopup from '../../components/ViewMembers/ViewMembersPopup';
import DropBoardMenu from '../../features/DropBoardMenu';
import styles from '../../assets/scss/home.module.scss';

const OneBoardOnBoards = ({ board, isGuestBoard }) => {
  const [showDropMenu, setShowDropMenu] = useState(false);
  const [showDropMenuGuest, setShowDropMenuGuest] = useState(false);
  const [boardtitle, setBoardtitle] = useState(board.boardTitle);
  const [clickBoardTitle, setClickBoardTitle] = useState(false);
  const [needToRename, setNeedToRename] = useState(false);
  const [coordY, setCoordY] = useState(0);
  const boards = useSelector(personalBoardsState);
  let navigate = useNavigate();

  const ref = useOutsideClick(() => {
    setShowDropMenu(false);
  });

  const handleClickBoard = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    navigate('/auth/board/' + id);
  };

  useEffect(() => {
    if (needToRename) {
      updateBoardTitle(board.id);
    }
  }, [needToRename]);

  const refInput = useOutsideClick(() => setNeedToRename(true));

  const updateBoardTitle = async (boardID) => {
    refInput.current.placeholder = '';

    if (refInput.current.value === '') {
      refInput.current.style.border = '2px solid red';
      refInput.current.placeholder = 'There should be a title';
      setNeedToRename(false);
    } else if (
      boards.some((el) => el.boardTitle === refInput.current.value) &&
      board.boardTitle !== refInput.current.value
    ) {
      refInput.current.style.border = '2px solid red';
      refInput.current.value = '';
      setBoardtitle('');
      refInput.current.placeholder = 'Such board already exists';
      setNeedToRename(false);
    } else {
      const docRef = doc(db, 'boards', boardID);
      await updateDoc(docRef, {
        boardTitle: refInput.current.value,
      });

      setClickBoardTitle(false);
      setNeedToRename(false);
      refInput.current = null;
      setTimeout(navigate('/auth/boards'), 0);
    }
  };

  const handleEnterKey = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      setNeedToRename(true);
    }
  };

  return (
    <div
      className={styles.boardWrapper}
      style={{ backgroundColor: board.boardColor }}
      onClick={
        !clickBoardTitle && !showDropMenu && !showDropMenuGuest
          ? (e) => handleClickBoard(e, board.id)
          : undefined
      }
    >
      <div style={{ padding: '0 10px' }}>
        {clickBoardTitle ? (
          <textarea
            ref={refInput}
            type="text"
            className={styles.titleInput}
            value={boardtitle}
            autoFocus
            onChange={(e) => setBoardtitle(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e)}
          ></textarea>
        ) : (
          <span className={styles.hoverTitle}> {board.boardTitle} </span>
        )}
      </div>
      {!isGuestBoard && (
        <div
          className={styles.dropupMenu}
          ref={ref}
          style={{
            boxShadow: showDropMenu
              ? '0px 0px 10px 4px rgba(9, 30, 66, .6)'
              : null,
          }}
        >
          <div
            className={styles.threeDots}
            onClick={(e) => {
              e.stopPropagation();
              setShowDropMenu((prev) => !prev);
              setCoordY(e.clientY - 180);
            }}
          >
            •••
          </div>
          {showDropMenu && (
            <div
              className={styles.boardDropMenuBackGround}
              style={{ backgroundColor: board.boardColor, top: coordY }}
            >
              <DropBoardMenu
                board={board}
                setShowDropMenu={setShowDropMenu}
                setClickBoardTitle={setClickBoardTitle}
                isOnBoards={true}
              />
            </div>
          )}
        </div>
      )}
      {isGuestBoard && (
        <div className={styles.dropupMenu}>
          <div
            className={styles.threeDots}
            onClick={(e) => {
              e.stopPropagation();
              setShowDropMenuGuest((prev) => !prev);
            }}
          >
            <span
              className={styles.hoverTitle}
              style={{ fontSize: '14px', textDecoration: 'overline #999' }}
            >
              &nbsp; view members &nbsp;
            </span>
          </div>
          {showDropMenuGuest && (
            <ViewMembersPopup
              currentBoard={board}
              setShowDropMenuGuest={setShowDropMenuGuest}
              isGuestBoard={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OneBoardOnBoards;
