import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import List from '../../components/List';
import AddListForm from '../../features/AddListForm';
import { allBoardsState } from '../../store/slices/allBoardsSlice';
import useBoardColor from '../../hooks/useBoardColor';
import MenuContext from '../../context/MenuContext';
import useOutsideClick from '../../hooks/useOutsideClick';
import ShortenTitle from '../../ui/ShortenTitle';
import { currentListsState } from '../../store/slices/currentListsSlice';
import { currentCardsState } from '../../store/slices/currentCardsSlice';
import {
  setCurrentDragStartCard,
  currentDragStartCardState,
} from '../../store/slices/currentDragStartCardSlice';
import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import useWindowSize from '../../hooks/useWindowSize';
import DropBoardMenu from '../../features/DropBoardMenu';
import style from '../../assets/scss/board.module.scss';

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useParams();
  const user = useAppSelector((state) => state.user.user);
  const allBoards = useAppSelector(allBoardsState);
  const persBoards = useAppSelector(personalBoardsState);
  const lists = useAppSelector(currentListsState);
  const cards = useAppSelector(currentCardsState);
  const currentDragStartCard = useAppSelector(currentDragStartCardState);
  const currentBoard = allBoards.find((ob) => ob.id === title.id)!;
  let navigate = useNavigate();
  const boardColor = useBoardColor(title.id);
  const context = useContext(MenuContext);
  const textColor = context?.textColor;
  const setTextColor = context?.setTextColor;
  const [draggingList, setDraggingList] = useState(false);
  const [draggingCard, setDraggingCard] = useState(false);
  const [boardtitle, setBoardtitle] = useState(currentBoard?.boardTitle);
  const [clickBoardTitle, setClickBoardTitle] = useState(false);
  const [needToRename, setNeedToRename] = useState(false);
  const [showDropMenu, setShowDropMenu] = useState(false);
  const [coordX, setCoordX] = useState(0);
  const dragItemList = useRef();
  const dragItemListNode = useRef();
  // const isPersonalBoard = user.id === currentBoard?.owner;
  const size = useWindowSize();

  const ref = useOutsideClick(() => {
    setShowDropMenu(false);
  });

  let allListsCards = [];
  let i = 0;

  for (const list of lists) {
    allListsCards.push({ list: list, cards: [] });

    for (const card of cards) {
      if (card.listID === list.id) {
        allListsCards[i].cards.push(card);
      }
    }
    i++;
  }
  allListsCards.sort((a, b) => a.list.position - b.list.position);
  allListsCards.forEach((el) => {
    el.cards.sort((a, b) => a.position - b.position);
  });

  const [listsCardsToRender, setListsCardsToRender] = useState(allListsCards);

  useEffect(() => {
    setBoardtitle(currentBoard?.boardTitle);
  }, [title]);

  useEffect(() => {
    setListsCardsToRender(allListsCards);
  }, [lists, cards]);

  const handleDragStartList = (e, item) => {
    dragItemList.current = item;
    dragItemListNode.current = e.target;
    dragItemListNode.current.addEventListener('dragend', handleDragEndList);

    setTimeout(function () {
      setDraggingList(true);
    }, 0);
  };

  const handleDragEnterList = (e, targetItem) => {
    const copyListItems = [...listsCardsToRender];

    if (draggingList) {
      const dragItemContent = copyListItems[dragItemList.current.index];
      copyListItems.splice(dragItemList.current.index, 1);
      copyListItems.splice(targetItem.index, 0, dragItemContent);
      dragItemList.current.index = targetItem.index;
    } else {
      const dragItemContent =
        copyListItems[currentDragStartCard.listIndex].cards[
          currentDragStartCard.cardIndex
        ];
      copyListItems[currentDragStartCard.listIndex].cards.splice(
        currentDragStartCard.cardIndex,
        1
      );
      copyListItems[targetItem.index].cards.splice(0, 0, dragItemContent);

      dispatch(
        setCurrentDragStartCard({
          listIndex: targetItem.index,
          cardIndex: 0,
          listID: targetItem.el.list.id,
          cardID: currentDragStartCard.cardID,
        })
      );
    }
    setListsCardsToRender(copyListItems);
  };

  const handleDragLeaveList = (e) => {
    e.preventDefault();
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    listsCardsToRender &&
      listsCardsToRender.map(async (el, index) => {
        const docRef = doc(db, 'lists', el.list.id);

        await updateDoc(docRef, {
          position: parseInt(index) + 1,
        });
      });
  };

  const handleDragEndList = (e) => {
    setDraggingList(false);
    dragItemList.current = null;
    dragItemListNode.current.removeEventListener('dragend', handleDragEndList);
    dragItemListNode.current = null;
  };

  const getStyles = (position) => {
    if (dragItemList.current.index === position) {
      return style.listBackgroundOpacity;
    }
    return style.listForeground;
  };

  const chooseLight = (e) => {
    e.preventDefault();
    setTextColor('#ffe');
  };

  const chooseDark = (e) => {
    e.preventDefault();
    setTextColor('rgb(23, 43, 77)');
  };

  useEffect(() => {
    if (needToRename) {
      updateBoardTitle(currentBoard.id);
    }
  }, [needToRename]);

  const refInput = useOutsideClick(() => setNeedToRename(true));

  const handleBoardTitle = (e) => {
    e.stopPropagation();
    setClickBoardTitle(true);
    refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)';
  };

  const updateBoardTitle = async (boardID) => {
    refInput.current.placeholder = '';
    if (refInput.current.value === '') {
      refInput.current.style.border = '2px solid red';
      refInput.current.placeholder = 'There should be a title';
      setNeedToRename(false);
    } else if (
      persBoards.some((el) => el.boardTitle === refInput.current.value) &&
      currentBoard.boardTitle !== refInput.current.value
    ) {
      refInput.current.style.border = '2px solid red';
      refInput.current.value = '';
      setBoardtitle('');
      refInput.current.placeholder =
        'The board with such a title already exists';
      setNeedToRename(false);
    } else {
      const docRef = doc(db, 'boards', boardID);
      await updateDoc(docRef, {
        boardTitle: refInput.current.value,
      });

      setClickBoardTitle(false);
      setNeedToRename(false);
      refInput.current = null;
      navigate('/auth/board/' + currentBoard.id);
    }
  };

  const handleEnterKey = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      setNeedToRename(true);
    }
  };

  const clickHeadMenu = (e) => {
    e.stopPropagation();
    setShowDropMenu((prev) => !prev);
    setCoordX(e.clientX - 170);
  };

  return (
    <div
      style={{
        backgroundColor: `${boardColor}cc`,
        color: `${title.id ? textColor : 'rgb(23, 43, 77)'}`,
      }}
    >
      <div className={style.head}>
        <div className={style.title} onClick={handleBoardTitle}>
          {clickBoardTitle ? (
            <>
              <textarea
                ref={refInput}
                type="text"
                className={style.inputTitle}
                value={boardtitle}
                autoFocus
                onChange={(e) => setBoardtitle(e.target.value)}
                onKeyDown={(e) => handleEnterKey(e)}
              ></textarea>
              <div style={{ width: '400px', visibility: 'hidden' }}></div>
            </>
          ) : (
            <ShortenTitle
              title={currentBoard?.boardTitle}
              number={size.width > 360 ? 30 : 26}
            />
          )}
        </div>
        <div
          className={style.headMenu}
          style={{
            fontSize: '12px',
            height: '32px',
            marginLeft: 'auto',
          }}
          onClick={(e) => clickHeadMenu(e)}
        >
          •••
        </div>
        {showDropMenu && (
          <div
            className={style.dropHeadMenu}
            style={{
              backgroundColor: currentBoard.boardColor,
              left: coordX,
            }}
            ref={ref}
          >
            <DropBoardMenu
              board={currentBoard}
              setShowDropMenu={setShowDropMenu}
              setClickBoardTitle={setClickBoardTitle}
              isOnBoards={false}
            />
          </div>
        )}
        <div className={style.headMenu}>
          {textColor === '#ffe' ? (
            <div className={style.changeColor_dark} onClick={chooseDark}>
              Text color
            </div>
          ) : (
            <div className={style.changeColor_light} onClick={chooseLight}>
              Text color
            </div>
          )}
        </div>
      </div>
      <div className={style.lists}>
        {listsCardsToRender &&
          listsCardsToRender.map((el, index) => {
            return (
              <div key={el.list.id}>
                <div className={style.listBackground}>
                  <div
                    onDragStart={(e) => handleDragStartList(e, { index, el })}
                    onDragEnter={
                      draggingList || (draggingCard && !el.cards.length)
                        ? (e) => {
                            handleDragEnterList(e, { index, el });
                          }
                        : null
                    }
                    onDragOver={
                      draggingList
                        ? (e) => {
                            allowDrop(e);
                          }
                        : null
                    }
                    onDragLeave={
                      draggingList
                        ? (e) => {
                            handleDragLeaveList(e);
                          }
                        : null
                    }
                    onDrop={(e) => {
                      drop(e);
                    }}
                    className={
                      draggingList ? getStyles(index) : style.listForeground
                    }
                    draggable={true}
                  >
                    <List
                      list={el.list}
                      cards={el.cards}
                      listsCardsToRender={listsCardsToRender}
                      setListsCardsToRender={setListsCardsToRender}
                      curBoardId={currentBoard?.id}
                      draggingCard={draggingCard}
                      setDraggingCard={setDraggingCard}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        <div>
          <AddListForm
            title={lists.length ? 'Add another list' : 'Add a list'}
            curBoardId={currentBoard?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;