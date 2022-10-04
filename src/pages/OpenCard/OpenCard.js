import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Board from '../Board';
import NotFound from '../NotFound';
import useOutsideClick from '../../hooks/useOutsideClick';
import CardTitle from '../../components/Card/CardTitle';
import CardMembers from '../../components/Card/CardMembers';
import CardDescription from '../../components/Card/CardDescription';
import CardCommentForm from '../../components/Card/comments/CardCommentForm';
import CardComments from '../../components/Card/comments/CardComments';
import CardSidebar from '../../components/Card/CardSidebar';
import { allCardsState } from '../../store/slices/allCardsSlice';
import { allListsState } from '../../store/slices/allListsSlice';
import style from '../../assets/scss/card.module.scss';

const OpenCard = () => {
  let navigate = useNavigate();
  const [clickTitle, setClickTitle] = useState(false);
  const title = useParams();
  const allCards = useSelector(allCardsState);
  const allLists = useSelector(allListsState);
  const card = allCards.find((ob) => ob.id === title?.idcard);
  const list = allLists.find((el) => el.id === card?.listID);
  const ref = useOutsideClick(() => navigate(-1));

  return (
    <>
      {card ? (
        <>
          <Board />
          <div className={style.window}>
            <div className={style.openedCardModal} ref={ref}>
              <div
                style={{
                  backgroundColor: card?.cardColor,
                  boxShadow: '0px 1px 3px #ddd',
                }}
              >
                <CardTitle
                  card={card}
                  list={list}
                  clickTitle={clickTitle}
                  setClickTitle={setClickTitle}
                />
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '75%' }}>
                  {card?.assignedUsers.length > 0 ? (
                    <CardMembers card={card} />
                  ) : null}
                  <CardDescription card={card} />
                  <CardCommentForm card={card} />
                  <CardComments card={card} />
                </div>
                <div style={{ width: '25%' }}>
                  <CardSidebar card={card} setClickTitle={setClickTitle} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default OpenCard;
