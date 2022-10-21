import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase-client';

import Card from '../Card';
import style from '../../assets/scss/card.module.scss';
import {
  setCurrentDragStartCard,
  currentDragStartCardState,
} from '../../store/slices/currentDragStartCardSlice';

interface CardsProps {
  list: List;
  cards: Cards;
  draggingCard: boolean;
  setDraggingCard: Dispatcher;
  listsCardsToRender: AllListsCardsType;
  setListsCardsToRender: React.Dispatch<React.SetStateAction<AllListsCardsType>>;
}

type DragStartCardType = {
  index: number;
  card: Card;
}

const Cards: React.FC<CardsProps> = ({
  list,
  cards,
  draggingCard,
  setDraggingCard,
  listsCardsToRender,
  setListsCardsToRender,
}) => {
  const dispatch = useAppDispatch();
  const currentDragStartCard = useAppSelector(currentDragStartCardState);
  const dragItemCard = useRef<number | null>(null);
  const dragItemCardNode = useRef<HTMLDivElement | null>(null);

  const handleDragStartCard = (e: React.DragEvent<HTMLDivElement>, item: DragStartCardType) => {
    e.stopPropagation();
    dragItemCard.current = item.index!;
    dragItemCardNode.current = e.target as HTMLDivElement;
    const listIndex = listsCardsToRender.findIndex(
      (el) => el.list.id === list.id
    )!;

    dispatch(
      setCurrentDragStartCard({
        cardIndex: dragItemCard.current,
        listIndex: listIndex,
        listID: list.id,
        cardID: item.card.id,
      })
    );

    dragItemCardNode.current.addEventListener('dragend', handleDragEndCard);

    setTimeout(function () {
      setDraggingCard(true);
    }, 0);
  };

  const handleDragEnterCard = (targetItem: DragStartCardType) => {
    let copyCards = [...listsCardsToRender];
    const listIndexForEnterCard = listsCardsToRender.findIndex(
      (el) => el.list.id === list.id
    );
    
    if (currentDragStartCard.listIndex && currentDragStartCard.cardIndex) {
      const dragItemContent =
        copyCards[currentDragStartCard.listIndex].cards[
          currentDragStartCard.cardIndex
        ];
      copyCards[currentDragStartCard.listIndex].cards.splice(
        currentDragStartCard.cardIndex,
        1
      );
      copyCards[listIndexForEnterCard].cards.splice(
        targetItem.index,
        0,
        dragItemContent
      );

      setListsCardsToRender(copyCards);

      dispatch(
        setCurrentDragStartCard({
          listIndex: listIndexForEnterCard,
          cardIndex: targetItem.index,
          listID: list.id,
          cardID: currentDragStartCard.cardID,
        })
      );
    }
    
  };

  const handleDragLeaveCard = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const allowDropCard = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropCard = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    listsCardsToRender &&
      listsCardsToRender.map((listItem, indexList) => {
        listItem.cards &&
          listItem.cards.map(async (card, indexCard) => {
            const docRef = doc(db, 'cards', card.id);

            await updateDoc(docRef, {
              listID: listsCardsToRender[indexList].list.id,
              position: indexCard + 1,
            });
          });
      });
  };

  const handleDragEndCard = () => {
    setDraggingCard(false);
    dragItemCard.current = null;
    if (dragItemCardNode.current) {
      dragItemCardNode.current.removeEventListener('dragend', handleDragEndCard);
      dragItemCardNode.current = null;
    }
  };

  const getStyles = (position: number): string => {
    if (
      currentDragStartCard.cardIndex === position &&
      currentDragStartCard.listID === list.id
    ) {
      return style.cardBackgroundOpacity;
    }
    return style.cardForeground;
  };

  return (
    <>
    {cards &&
      cards.map((card, index) => {
        return (
          <div key={card.id} className={style.cardBackground}>
            <div
              onDragStart={(e) => handleDragStartCard(e, { index, card })}
              onDragEnter={
                draggingCard
                  ? () => {
                      handleDragEnterCard({ index, card });
                    }
                  : undefined
              }
              onDragOver={
                draggingCard
                  ? (e) => {
                      allowDropCard(e);
                    }
                  : undefined
              }
              onDragLeave={
                draggingCard
                  ? (e) => {
                      handleDragLeaveCard(e);
                    }
                  : undefined
              }
              onDrop={handleDropCard}
              className={draggingCard ? getStyles(index) : style.cardForeground}
              draggable={true}
            >
              <Card card={card} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Cards;
