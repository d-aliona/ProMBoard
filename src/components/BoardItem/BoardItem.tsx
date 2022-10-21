import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import useOutsideClick from '../../hooks/useOutsideClick';
import ShortenTitle from '../../ui/ShortenTitle';
import DropBoardMenu from '../../features/DropBoardMenu';
import style from '../../assets/scss/sidebar.module.scss';
import useWindowSize from '../../hooks/useWindowSize';

interface BoardItemProps {
  board: Board;
  refSidebar: React.MutableRefObject<HTMLDivElement>;
}

const BoardItem: React.FC<BoardItemProps> = ({ board, refSidebar }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropMenu, setShowDropMenu] = useState(false);
  const [boardtitle, setBoardtitle] = useState(board.boardTitle);
  const [clickBoardTitle, setClickBoardTitle] = useState(false);
  const [needToRename, setNeedToRename] = useState(false);
  const [coordY, setCoordY] = useState(0);
  const boards = useAppSelector(personalBoardsState);
  const title = useParams();
  let navigate = useNavigate();
  const size = useWindowSize();
  const refInput = useRef<HTMLTextAreaElement | null>(null);

  const ref = useOutsideClick(() => {
    setShowDropMenu(false);
  });

  const handleClickBoard = () => {
    navigate('/auth/board/' + board.id);
  };

  useEffect(() => {
    if (needToRename) {
      updateBoardTitle(board.id);
    }
  }, [needToRename]);

  const refDiv = useOutsideClick(() => setNeedToRename(true));

  const updateBoardTitle = async (boardID: string) => {
    if (refInput.current) {
      refInput.current.placeholder = '';

      if (refInput.current.value === '') {
        refInput.current.style.border = '2px solid red';
        refInput.current.placeholder = 'There should be a title';
        setNeedToRename(false);
      } else if (
        boards.some((el) => el.boardTitle === refInput?.current?.value) &&
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
        navigate('/auth/board/' + board.id);
      }
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      setNeedToRename(true);
    }
  };

  return (
    <div
      key={board.id}
      className={style.boardItem}
      style={{
        backgroundColor: `${
          board.id === title.id ? 'rgba(23, 43, 77, .3)' : ''
        }`,
        height: `${clickBoardTitle ? 'auto' : '32px'}`,
      }}
      onClick={handleClickBoard}
      onMouseOver={() => setShowMenu(true)}
      onMouseOut={() => setShowMenu(false)}
    >
      {clickBoardTitle ? (
        <div ref={refDiv}>
          <textarea
            ref={refInput}
            style={{
              borderRadius: '4px',
              paddingLeft: '4px',
              zIndex: '2000',
              border: '1px solid rgba(23, 43, 77, .7)',
            }}
            value={boardtitle}
            autoFocus
            onChange={(e) => setBoardtitle(e.target.value)}
            onKeyDown={handleEnterKey}
          ></textarea>
        </div>
      ) : (
        <>
          <div
            className={style.colorBoard}
            style={{ backgroundColor: `${board.boardColor}` }}
          ></div>
          <ShortenTitle title={board.boardTitle} number={13} />
        </>
      )}
      <div
        className={style.threeDots}
        style={{
          opacity: `${board.id === title.id ? '1' : '0'}`,
          marginRight: `${board.id === title.id ? '0' : '-18px'}`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowDropMenu((prev) => (board.id === title.id ? !prev : prev));
          setCoordY(e.clientY - 10);
        }}
      >
        •••
      </div>
      {showMenu && (
        <div>
          <div
            className={style.threeDotsWithoutHover}
            style={{ display: `${board.id === title.id ? 'none' : ''}` }}
          >
            •••
          </div>
        </div>
      )}
      {showDropMenu && (
        <div
          className={style.boardDropMenuBackGround}
          style={{
            width: size.width < 800 ? '200px' : '',
            backgroundColor: board.boardColor,
            left: size.width < 800 ? 0 : refSidebar.current.offsetWidth,
            top: size.width < 800 ? coordY + 30 : coordY,
          }}
          ref={ref}
        >
          <DropBoardMenu
            board={board}
            setShowDropMenu={setShowDropMenu}
            setClickBoardTitle={setClickBoardTitle}
            isOnBoards={false}
          />
        </div>
      )}
    </div>
  );
};

export default BoardItem;
