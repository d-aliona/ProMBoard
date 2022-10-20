import React from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import ShortenTitle from '../../ui/ShortenTitle';
import style from '../../assets/scss/list.module.scss';

interface DropCardProps {
  list: List;
  lists: Lists;
  cardsOnCurList: Cards;
  listsCardsToRender: AllListsCardsType;
  setMessageMoveAllCards: Dispatcher;
  setShowMenu: Dispatcher;
}

const DropCardsList: React.FC<DropCardProps> = ({
  list,
  lists,
  cardsOnCurList,
  listsCardsToRender,
  setMessageMoveAllCards,
  setShowMenu,
}) => {
  const moveAllCards = (selListID: string) => {
    cardsOnCurList.forEach(async (el, index) => {
      const docRef = doc(db, 'cards', el.id);

      await updateDoc(docRef, {
        listID: selListID,
        position:
          listsCardsToRender.find((it) => it.list.id === selListID)!.cards
            .length +
          1 +
          index,
      });
    });
    setMessageMoveAllCards(false);
    setShowMenu(false);
  };

  return (
    <>
      {lists &&
        lists.map((el) => {
          return (
            <div key={el.id}>
              <div
                className={style.menuItem}
                style={{
                  color: el.id === list.id ? '#ccc' : '',
                  cursor: el.id === list.id ? 'auto' : 'pointer',
                }}
                onClick={el.id === list.id ? undefined : () => moveAllCards(el.id)}
              >
                <ShortenTitle title={el.listTitle} number={30} />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default DropCardsList;
