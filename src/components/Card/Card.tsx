import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

import AssignedMemberOnCardCover from './AssignedMemberOnCardCover';
import style from '../../assets/scss/card.module.scss';

interface CardProps {
  card: Card;
}

const Card: React.FC<CardProps> = ({ card }) => {
  let navigate = useNavigate();
  const title = useParams();
  const users = useAppSelector((state) => state.users.users);

  const handleClickToOpenCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate('/auth/board/' + title.id + '/' + card.id);
  };

  return (
    <>
      <div
        className={style.cardWrapper}
        style={{ backgroundColor: card.cardColor }}
      >
        <div className={style.cardTitle} onClick={handleClickToOpenCard}>
          <div
            style={{
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              lineHeight: '120%',
            }}
          >
            {card?.cardTitle}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {card?.description ? (
              <abbr title="This card has a description">
                <div className={style.descriptioniconMini}></div>
              </abbr>
            ) : null}
            {card.commentsExist ? (
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  justifyContent: 'center',
                }}
              >
                <abbr title="This card has comments">
                  <div className={style.commenticonMini}></div>
                </abbr>
                <div
                  style={{
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {card.commentsNumber}
                </div>
              </div>
            ) : null}
            {card?.assignedUsers?.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                  marginLeft: 'auto',
                }}
              >
                {card.assignedUsers &&
                  card.assignedUsers.map((memberID) => {
                    const currentMember = users.find(
                      (user) => user.id === memberID
                    )!;
                    return <AssignedMemberOnCardCover key={memberID} currentMember={currentMember}/>     
                  })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
