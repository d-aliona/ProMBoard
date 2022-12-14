import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import { notPersonalBoardsState } from '../../store/slices/notPersonalBoardsSlice';

import BoardItem from '../BoardItem';
import useBoardColor from '../../hooks/useBoardColor';
import { TickDown } from '../../assets/svg/svg-icons';
import MenuContext from '../../context/MenuContext';
import ShortenTitle from '../../ui/ShortenTitle';
import useWindowSize from '../../hooks/useWindowSize';
import style from '../../assets/scss/sidebar.module.scss';

interface SidebarProps {
  toggleClick: boolean;
  setToggleClick: Dispatcher;
}

const Sidebar: React.FC<SidebarProps> = ({toggleClick, setToggleClick}) => {
  const user = useAppSelector((state) => state.user.user);
  const size = useWindowSize();
  const [showYourBoards, setShowYourBoards] = useState(true);
  const [showGuestBoards, setShowGuestBoards] = useState(true);
  const [changeTick, setChangeTick] = useState<string>(style.tickLeft);
  const [tickUpDownPers, setTickUpDownPers] = useState<string>(style.TickDown);
  const [tickUpDownGuest, setTickUpDownGuest] = useState<string>(style.TickDown);
  const getBoards = useAppSelector(personalBoardsState);
  const boards = [...getBoards];
  let navigate = useNavigate();
  const title = useParams();
  const boardColor = useBoardColor(title.id);
  const context = useContext(MenuContext);
  const textColor = context?.textColor;
  const notUserBoards = useAppSelector(notPersonalBoardsState);
  const getGuestBoards =
    notUserBoards && notUserBoards.length > 0
      ? notUserBoards.filter((board) => board.invitedMembers.includes(user.id!))
      : [];
  const guestBoards = [...getGuestBoards];
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    size.width < 799 ? setToggleClick(false) : setToggleClick(true);
  }, [size.width]);

  useEffect(() => {
    setChangeTick(toggleClick ? style.tickLeft : style.tickRight);
  }, [toggleClick]);

  useEffect(() => {
    setTickUpDownPers(showYourBoards ? style.tickDown : style.tickUp);
  }, [showYourBoards]);

  useEffect(() => {
    setTickUpDownGuest(showGuestBoards ? style.tickDown : style.tickUp);
  }, [showGuestBoards]);

  const handleClickBoard = (id: string) => {
    navigate('/auth/board/' + id);
  };

  const styles: {} = {
    '--backgroundColor': `${title.id ? boardColor : '#f4f5f7'}`,
    '--hoverColor': 'rgba(23, 43, 77, .4)',
  }

  return (
    <>
      {toggleClick && (
        <div
          ref={ref}
          className={style.wrapper}
          style={{
            backgroundColor: `${title.id ? boardColor : '#f4f5f7'}`,
            color: `${title.id ? textColor : 'rgb(23, 43, 77)'}`,
          }}
        >
          <div
            className={`${changeTick}`}
            onClick={() => setToggleClick((prev) => !prev)}
          >
            <TickDown />
          </div>
          <div
            className={style.dropBoards}
            onClick={() => navigate('/auth/boards')}
          >
            Boards
          </div>
          <div
            className={style.dropBoards}
            onClick={() => navigate('/auth/members')}
          >
            Members
          </div>
          <div
            className={style.dropBoards}
            onClick={() => setShowYourBoards((prev) => !prev)}
          >
            Personal boards
            <span className={`${tickUpDownPers}`}>
              <TickDown />
            </span>
          </div>
          {!showYourBoards && (
            <div className={style.scrollbar}>
              {boards &&
                boards
                  .sort((a, b) => a.boardTitle.localeCompare(b.boardTitle))
                  .map((board) => (
                  <BoardItem key={board.id} board={board} refSidebar={ref} />
                ))}
            </div>
          )}
          {guestBoards.length > 0 && (
            <div
              className={style.dropBoards}
              onClick={() => setShowGuestBoards((prev) => !prev)}
            >
              Guest boards
              <span className={`${tickUpDownGuest}`}>
                <TickDown />
              </span>
            </div>
          )}
          {!showGuestBoards && (
            <div className={style.scrollbar}>
              {guestBoards &&
                guestBoards
                  .sort((a, b) => a.boardTitle.localeCompare(b.boardTitle))
                  .map((board) => (
                  <div
                    key={board.id}
                    className={style.boardItem}
                    style={{
                      backgroundColor: `${
                        board.id === title.id ? 'rgba(23, 43, 77, .3)' : ''
                      }`,
                    }}
                    onClick={() => handleClickBoard(board.id)}
                  >
                    <div
                      className={style.colorBoard}
                      style={{ backgroundColor: `${board.boardColor}` }}
                    ></div>
                    <ShortenTitle title={board.boardTitle} number={13} />
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
      {!toggleClick && (
        <div
          className={style.wrapperHidden}
          style={styles}
          onClick={() => setToggleClick((prev) => !prev)}
        >
          <div className={`${changeTick}`}>
            <TickDown />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
