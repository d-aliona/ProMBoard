import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';

import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase-client';

import Initials from '../../ui/Initials';
import Input from '../../ui/Input';
import ChangePasswordForm from '../../features/ChangePasswordForm';
import style from '../../assets/scss/profile.module.scss';
import styles from '../../assets/scss/card.module.scss';

const Profile: React.FC = () => {
  const curUser = useAppSelector((state) => state.user.user);
  const [firstName, setFirstName] = useState(curUser.firstName);
  const [lastName, setLastName] = useState(curUser.lastName);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showChangePassForm, setShowChangePassForm] = useState(false);

  const saveNameUser = async () => {
    const docRef = doc(db, 'users', curUser.id!);
    await updateDoc(docRef, {
      firstName: firstName,
      lastName: lastName,
    });
    setShowSaveButton(false);
  };
  
  return (
    <div>
      <div className={style.head}>
        <div className={style.title}>
          <Initials user={curUser} />
          {curUser.firstName} {curUser.lastName}
        </div>
        <p className={style.email}>{curUser.email}</p>
      </div>
      <div className={style.line}></div>
      <div>
        <div className={style.nameItem}>
          <h2 className={style.nameTitle}>First name</h2>
          <div className={style.nameInput}>
            <Input
              type={'text'}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setShowSaveButton(true);
              }}
              height={'26px'}
            />
          </div>
        </div>
        <div className={style.nameItem}>
          <h2 className={style.nameTitle}>Last name</h2>
          <div className={style.nameInput}>
            <Input
              type={'text'}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setShowSaveButton(true);
              }}
              height={'26px'}
            />
          </div>
        </div>
      </div>
      {showSaveButton && (
        <div className={style.changeNamesButtons}>
          <div
            className={styles.buttonTrue}
            onClick={saveNameUser}
            style={{ width: '50%', textAlign: 'center' }}
          >
            <div style={{ padding: '2px' }}>Save</div>
          </div>
          <div
            className={styles.buttonCancel}
            style={{ width: '50%', textAlign: 'center' }}
            onClick={() => {
              setShowSaveButton(false);
              setFirstName(curUser.firstName);
              setLastName(curUser.lastName);
            }}
          >
            <div style={{ padding: '2px' }}>Cancel</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1px', flexWrap: 'wrap' }}>
        {auth.currentUser?.providerData[0].providerId === 'password' && 
          <h2
            className={style.nameTitle}
            style={{
              display: 'flex',
              gap: '15px',
              cursor: 'pointer',
              height: '30px',
            }}
            onClick={() => setShowChangePassForm(!showChangePassForm)}
          >
            Change password
            <div style={{ transform: 'scale(1.4)', color: '#555' }}>
              {' '}
              &#x279C;
            </div>
          </h2>
        }
        {showChangePassForm && (
          <ChangePasswordForm setShowChangePassForm={setShowChangePassForm} />
        )}
      </div>
    </div>
  );
};

export default Profile;
