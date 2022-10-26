import React, { useState } from 'react';

import MemberOnCard from './MemberOnCard';
import AssignMemberForm from '../../features/AssignMemberForm';
import style from '../../assets/scss/card.module.scss';

const CardMembers: React.FC<CardProps> = ({ card }) => {
  const [clickAddMembers, setClickAddMembers] = useState(false);

  return (
    <>
      <div className={style.boundaries}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
          <div className={style.displayMembersicon}></div>
          <div style={{ fontSize: '18px' }}>Members</div>
        </div>
        <div className={style.cardMembersWrapper}>
          {card.assignedUsers &&
            card.assignedUsers.map((memberID) => {
              return (
                <MemberOnCard key={memberID} card={card} memberID={memberID} />
              );
            })}
          <div
            className={style.assignMember}
            onClick={(e) => {
              setClickAddMembers(true);
              e.stopPropagation();
            }}
          >
            +
          </div>
        </div>
        {clickAddMembers && (
          <AssignMemberForm
            card={card}
            setClickAddMembers={setClickAddMembers}
          />
        )}
      </div>
    </>
  );
};

export default CardMembers;
