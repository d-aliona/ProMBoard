import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import Cards from '../Cards';
import AddCardForm from '../../features/AddCardForm';
import DropListMenu from '../../features/DropListMenu';
import { currentListsState } from '../../store/slices/currentListsSlice';
import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/list.module.scss';
// import styles from '../../assets/scss/sidebar.module.scss';

const List = ({
  list,
  cards,
  curBoardId,
  draggingCard,
  setDraggingCard,
  listsCardsToRender,
  setListsCardsToRender,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [listtitle, setListtitle] = useState(list.listTitle);
  const [clickTitle, setClickTitle] = useState(false);
  const ref = useOutsideClick(() => setShowMenu(false));
  const refListHeader = useRef();
  const lists = useSelector(currentListsState);
  const [headerHeight, setHeaderHeight] = useState(0);

  const cardsOnCurList = listsCardsToRender.find(
    (el) => el.list.id === list.id
  ).cards;

  useEffect(() => {
    setHeaderHeight(refListHeader.current.clientHeight);
  }, [listtitle]);

  const updateListTitle = async (listID) => {
    if (refInput.current.value === '') {
      refInput.current.style.border = '2px solid red';
      refInput.current.placeholder = 'There should be a title';
    } else if (
      lists.some((el) => el.listTitle === refInput.current.value) &&
      list.listTitle != refInput.current.value
    ) {
      refInput.current.style.border = '2px solid red';
      refInput.current.value = '';
      refInput.current.placeholder = 'Such list already exists';
    } else {
      const docRef = doc(db, 'lists', listID);

      await updateDoc(docRef, {
        listTitle: refInput.current.value,
      });
      setClickTitle(false);
      refInput.current = null;
    }
  };

  const refInput = useOutsideClick(() => updateListTitle(list.id));

  const toggle = (e) => {
    setShowMenu((prev) => !prev);
    e.stopPropagation();
  };

  const handleListTitle = (e) => {
    e.stopPropagation();
    setClickTitle(true);
    refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)';
  };

  const handleEnterKey = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      updateListTitle(list.id);
    }
  };

  return (
    <>
      <div className={style.listWrapper}>
        <div className={style.listHeader} ref={refListHeader}>
          <div className={style.listTitle} onClick={handleListTitle}>
            {clickTitle ? (
              <textarea
                ref={refInput}
                type="text"
                className={style.inputTitle}
                value={listtitle}
                autoFocus
                onChange={(e) => setListtitle(e.target.value)}
                onKeyDown={(e) => handleEnterKey(e)}
              ></textarea>
            ) : (
              <div style={{ lineHeight: '120%' }}>{list.listTitle}</div>
            )}
          </div>
          <div className={style.listMenu} onClick={toggle}>
            •••
          </div>
        </div>
        {showMenu && (
          <div className={style.dropMenu} ref={ref}>
            <DropListMenu
              list={list}
              lists={lists}
              listsCardsToRender={listsCardsToRender}
              cardsOnCurList={cardsOnCurList}
              setShowMenu={setShowMenu}
              setClickTitle={setClickTitle}
            />
          </div>
        )}
        <div
          className={style.scrollbar}
          style={{ maxHeight: `calc(100vh - 210px - ${headerHeight}px)` }}
        >
          {
            <Cards
              list={list}
              cards={cards}
              listsCardsToRender={listsCardsToRender}
              setListsCardsToRender={setListsCardsToRender}
              curBoardId={curBoardId}
              draggingCard={draggingCard}
              setDraggingCard={setDraggingCard}
            />
          }
        </div>
        <AddCardForm list={list} curBoardId={curBoardId} />
      </div>
    </>
  );
};

export default List;
