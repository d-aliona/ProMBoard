import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import ShortenTitle from '../../ui/ShortenTitle';
import useOutsideClick from '../../hooks/useOutsideClick';
import { addNotificationToDataBase } from '../exportFunctions';
import { allListsState } from '../../store/slices/allListsSlice';
import { allCardsState } from '../../store/slices/allCardsSlice';
import { allBoardsState } from '../../store/slices/allBoardsSlice';
import { personalBoardsState } from '../../store/slices/personalBoardsSlice';
import style from '../../assets/scss/card.module.scss';

interface MoveCardProps {
  card: Card;
  setClickMoveCard: Dispatcher;
}

const MoveCard: React.FC<MoveCardProps> = ({ card, setClickMoveCard }) => {
  const user = useAppSelector((state) => state.user.user);
  const persBoards = useAppSelector(personalBoardsState);
  const allBoards = useAppSelector(allBoardsState);
  const allLists = useAppSelector(allListsState);
  const allCards = useAppSelector(allCardsState);
  const ref = useOutsideClick(() => {
    setClickMoveCard(false);
  });
  const curList = allLists.find((el) => el.id === card.listID)!;
  const curBoard = allBoards.find((el) => el.id === card.boardID)!;
  const [openBoardList, setOpenBoardList] = useState(false);
  const [openListsList, setOpenListsList] = useState(false);
  const [openPositionList, setOpenPositionList] = useState(false);
  const [chosenBoard, setChosenBoard] = useState(curBoard);
  const [chosenList, setChosenList] = useState(curList);
  const [chosenPosition, setChosenPosition] = useState(card.position);
  const [listsOfChosenBoard, setListsOfChosenBoard] = useState<Lists>([]);
  const [cardsOfChosenList, setCardsOfChosenList] = useState<Cards>([]);
  const isPersonalBoard = user.id === curBoard.owner;
  const cardsOfCurrentList = allCards.filter((el) => el.listID === curList.id);
  let navigate = useNavigate();

  useEffect(() => {
    const data = allLists.filter((el) => el.boardID === chosenBoard.id);
    setListsOfChosenBoard(data);
  }, [chosenBoard]);

  useEffect(() => {
    setChosenList(listsOfChosenBoard[0]);
  }, [listsOfChosenBoard]);

  useEffect(() => {
    if (chosenList) {
      const data = allCards.filter((el) => el.listID === chosenList.id);
      setCardsOfChosenList(data);
    }
  }, [chosenList]);

  useEffect(() => {
    setChosenPosition(
      chosenList?.id === card.listID
        ? cardsOfChosenList.length
        : cardsOfChosenList.length + 1
    );
  }, [cardsOfChosenList]);

  const moveCard = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (card.listID === chosenList.id) {
      cardsOfChosenList
        .filter((el) => el.position > card.position)
        .forEach(async (el) => {
          const docRef = doc(db, 'cards', el.id);
          await updateDoc(docRef, {
            position: el.position - 1,
          });
        });
    } else {
      cardsOfChosenList
        .filter((el) => el.position >= chosenPosition)
        .forEach(async (el) => {
          const docRef = doc(db, 'cards', el.id);
          await updateDoc(docRef, {
            position: el.position + 1,
          });
        });
      cardsOfCurrentList
        .filter((el) => el.position > card.position)
        .forEach(async (el) => {
          const docRef = doc(db, 'cards', el.id);
          await updateDoc(docRef, {
            position: el.position - 1,
          });
        });
    }
    if (chosenBoard.id !== card.boardID) {
      card.assignedUsers.forEach(async (el) => {
        if (
          !chosenBoard.invitedMembers.includes(el) &&
          el !== chosenBoard.owner
        ) {
          const docRef = doc(db, 'boards', chosenBoard.id);
          await updateDoc(docRef, {
            invitedMembers: [...chosenBoard.invitedMembers, el],
          });
          const ob = {
            memberID: el,
            userID: user.id!,
            text: 'added you to this board',
            boardID: chosenBoard.id,
            boardTitle: chosenBoard.boardTitle,
            boardColor: chosenBoard.boardColor,
          };
          addNotificationToDataBase(ob);
        }
      });
    }
    setClickMoveCard(false);
    navigate(-1);

    const docRef = doc(db, 'cards', card.id);
    await updateDoc(docRef, {
      listID: chosenList.id,
      boardID: chosenBoard.id,
      position: chosenPosition,
    });
  };

  return (
    <>
      <div className={style.cardCoverWrapper} ref={ref}>
        <p style={{ fontWeight: '400', padding: '5px 0 0 2px' }}>board:</p>
        <div
          className={style.copyCardItem}
          onClick={(e) => {
            setOpenBoardList((prev) => !prev);
            e.stopPropagation();
          }}
        >
          <ShortenTitle title={chosenBoard.boardTitle} number={14} />
          <div>{openBoardList ? '' : '???'}</div>
          {openBoardList && (
            <div className={style.copyCardDropMenu}>
              {persBoards &&
                persBoards.map((el) => {
                  return (
                    <div
                      key={el.id}
                      className={style.copyCardDropItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChosenBoard(el);
                        setOpenBoardList(false);
                      }}
                    >
                      <ShortenTitle title={el.boardTitle} number={14} />
                    </div>
                  );
                })}
              {isPersonalBoard ? (
                ''
              ) : (
                <div className={style.copyCardDropItem}>
                  <ShortenTitle title={curBoard.boardTitle} number={14} />
                </div>
              )}
            </div>
          )}
        </div>

        <p style={{ fontWeight: '400', padding: '5px 0 0 2px' }}>list:</p>
        <div
          className={style.copyCardItem}
          onClick={(e) => {
            setOpenListsList((prev) => !prev);
            e.stopPropagation();
          }}
        >
          {listsOfChosenBoard.length === 0 ? (
            <span style={{ color: 'rgb(129, 3, 3)' }}>No lists</span>
          ) : (
            <ShortenTitle title={chosenList?.listTitle} number={14} />
          )}
          <div>{openListsList ? '' : '???'}</div>
          {openListsList && (
            <div className={style.copyCardDropMenu}>
              {listsOfChosenBoard.length > 0 &&
                listsOfChosenBoard.map((el) => {
                  return (
                    <div
                      key={el.id}
                      className={style.copyCardDropItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChosenList(el);
                        setOpenListsList(false);
                      }}
                    >
                      <ShortenTitle title={el.listTitle} number={14} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <p style={{ fontWeight: '400', padding: '5px 0 0 2px' }}>position:</p>
        <div
          className={style.copyCardItem}
          onClick={(e) => {
            setOpenPositionList((prev) => !prev);
            e.stopPropagation();
          }}
        >
          {chosenList ? <span>{chosenPosition}</span> : '0'}
          <div>{openPositionList ? '' : '???'}</div>
          {openPositionList && (
            <div className={style.copyCardDropMenu}>
              {[
                ...Array(
                  chosenList.id === card.listID
                    ? cardsOfChosenList.length
                    : cardsOfChosenList.length + 1
                ),
              ].map((x, index) => {
                return (
                  <div
                    key={index}
                    className={style.copyCardDropItem}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChosenPosition(index + 1);
                      setOpenPositionList(false);
                    }}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div
          className={style.copyCardButton}
          style={{ marginTop: '8px' }}
          onClick={moveCard}
        >
          Move card
        </div>
      </div>
    </>
  );
};

export default MoveCard;
