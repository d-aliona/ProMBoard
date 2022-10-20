import React, { useState } from 'react';

import DeleteListForm from '../DeleteListForm';
import DropCardsList from './DropCardsList';
import CloseButton from '../../ui/CloseButton';
import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/list.module.scss';

interface DropListProps {
  list: List;
  lists: Lists;
  listsCardsToRender: AllListsCardsType;
  cardsOnCurList: Cards;
  setShowMenu: Dispatcher;
  setClickTitle: Dispatcher;
}

const DropListMenu: React.FC<DropListProps> = ({
  list,
  lists,
  listsCardsToRender,
  cardsOnCurList,
  setShowMenu,
  setClickTitle,
}) => {
  const [messageDeleteList, setMessageDeleteList] = useState(false);
  const [messageDeleteAllCards, setMessageDeleteAllCards] = useState(false);
  const [messageMoveAllCards, setMessageMoveAllCards] = useState(false);
  const noCards = cardsOnCurList.length === 0;
  const ref = useOutsideClick(() => setMessageMoveAllCards(false));

  const handleDeleteList = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMessageDeleteList((prev) => !prev);
    e.stopPropagation();
  };
  const handleDeleteAllCards = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMessageDeleteAllCards((prev) => !prev);
    e.stopPropagation();
  };
  const handleMoveAllCards = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMessageMoveAllCards((prev) => !prev);
    e.stopPropagation();
  };

  return (
    <>
      <div className={style.title}>
        <span className={style.titleName}>List actions</span>
        <CloseButton onClick={() => setShowMenu(false)} />
      </div>
      <hr className={style.line} />
      <div
        className={style.menuItem}
        onClick={(e) => {
          e.stopPropagation();
          setClickTitle(true);
        }}
      >
        Rename list
      </div>
      <hr className={style.line} />
      <div style={{ position: 'relative' }}>
        <div
          className={style.menuItem}
          style={{
            color: noCards || lists.length === 1 ? '#ccc' : '',
            cursor: noCards || lists.length === 1 ? 'auto' : 'pointer',
          }}
          onClick={noCards || lists.length === 1 ? undefined : handleMoveAllCards}
        >
          Move all cards from this list to...
        </div>
        {messageMoveAllCards && (
          <div
            className={`${style.dropMenu} ${style.scrollbar}`}
            ref={ref}
            style={{
              position: 'relative',
              left: '10px',
              maxHeight: `calc(100vh - 400px)`,
            }}
          >
            <DropCardsList
              list={list}
              lists={lists}
              cardsOnCurList={cardsOnCurList}
              listsCardsToRender={listsCardsToRender}
              setMessageMoveAllCards={setMessageMoveAllCards}
              setShowMenu={setShowMenu}
            />
          </div>
        )}
      </div>

      <div
        className={style.menuItem}
        style={{
          color: noCards ? '#ccc' : '',
          cursor: noCards ? 'auto' : 'pointer',
        }}
        onClick={noCards ? undefined : handleDeleteAllCards}
      >
        Delete all cards on this list
      </div>
      {messageDeleteAllCards && (
        <DeleteListForm
          list={list}
          cardsOnCurList={cardsOnCurList}
          listWillbeDeleted={false}
          setMessageDeleteAllCards={setMessageDeleteAllCards}
          setShowMenu={setShowMenu}
        />
      )}
      <hr className={style.line} />
      <div className={style.menuItem} onClick={handleDeleteList}>
        Delete this list
      </div>
      {messageDeleteList && (
        <DeleteListForm
          list={list}
          cardsOnCurList={cardsOnCurList}
          listWillbeDeleted={true}
          setMessageDeleteList={setMessageDeleteList}
          setShowMenu={setShowMenu}
        />
      )}
    </>
  );
};

export default DropListMenu;
