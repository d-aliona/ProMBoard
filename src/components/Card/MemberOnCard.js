import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-client';
import DeleteMemberFromCardForm from '../../features/DeleteMemberFromCardForm';
import AssignMemberForm from '../../features/AssignMemberForm';
import Initials from '../../ui/Initials';
import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/card.module.scss';

const MemberOnCard = ({ card, memberID }) => {
  const users = useSelector((state) => state.users.users);
  // const [clickAddMembers ,setClickAddMembers] = useState(false)
  const [showDeleteMemberForm, setShowDeleteMemberForm] = useState(false);
  const currentMember = users.find((user) => user.id === memberID);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          className={style.assignedMember}
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteMemberForm(true);
          }}
          data-descr={
            currentMember.firstName +
            ' ' +
            currentMember.lastName +
            ' ' +
            currentMember.email
          }
        >
          <Initials user={currentMember} />
        </div>
        {/* <DeleteMemberFromCardForm />  */}
        {showDeleteMemberForm ? (
          <DeleteMemberFromCardForm
            card={card}
            memberID={memberID}
            currentMember={currentMember}
            setShowDeleteMemberForm={setShowDeleteMemberForm}
          />
        ) : null}
      </div>
    </>
  );
};

export default MemberOnCard;
