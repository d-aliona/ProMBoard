import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  collection,
  orderBy,
  query,
  onSnapshot,
  where,
  limit,
} from 'firebase/firestore';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import CloseButton from '../../ui/CloseButton';
import Line from '../../ui/Line';
import { TickDown } from '../../assets/svg/svg-icons';
import {
  setNotifications,
  notificationsState,
} from '../../store/slices/notificationsSlice';
import OneNotification from './OneNotification';
import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/home.module.scss';
import styles from '../../assets/scss/topbar.module.scss';
import styless from '../../assets/scss/boardsList.module.scss';

const Notifications = () => {
  const user = useSelector((state) => state.user.user);
  const [showDropWindow, setShowDropWindow] = useState(false);
  const notifications = useSelector(notificationsState);
  const [newNotificationExist, setNewNotificationExist] = useState(false);
  const [limitNumber, setLimitNumber] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    const notificationsCol = collection(db, 'users', user.id, 'notifications');
    const qNotifications = query(
      notificationsCol,
      orderBy('sortkey', 'desc'),
      limit(limitNumber)
    );

    onSnapshot(qNotifications, (snapshot) => {
      const notificationsSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      dispatch(setNotifications(notificationsSnap));
    });
  }, [limitNumber]);

  useEffect(() => {
    if (notifications.some((el) => el.read === false)) {
      setNewNotificationExist(true);
    } else {
      setNewNotificationExist(false);
    }
  }, [notifications]);

  useEffect(() => {
    if (notifications.length > 0 && !showDropWindow) {
      const dataToChange = notifications.filter((ob) => ob.read === false);

      dataToChange.forEach(async (item) => {
        const docRef = doc(db, 'users', user.id, 'notifications', item.id);
        await updateDoc(docRef, {
          read: true,
        });
      });
    }
  }, [showDropWindow]);

  const ref = useOutsideClick(() => setShowDropWindow(false));

  const toggle = async (e) => {
    setShowDropWindow((prev) => !prev);
    e.stopPropagation();
  };

  const deleteAllNotifications = (e) => {
    e.stopPropagation();
    notifications &&
      notifications.forEach(async (item) => {
        const docRef = doc(db, 'users', user.id, 'notifications', item.id);
        await deleteDoc(docRef);
      });
  };

  return (
    <>
      <div
        onClick={toggle}
        style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}
      >
        <div className={styles.bellicon}>
          <div
            className={`${
              newNotificationExist ? styles.newnotification : null
            }`}
          ></div>
        </div>
      </div>
      {showDropWindow && (
        <div className={styles.dropListNotifications} ref={ref}>
          <div className={styless.title}>
            <span className={styless.titleName}>Notifications</span>
            <CloseButton onClick={() => setShowDropWindow(false)} />
          </div>
          <Line width={'96%'} />
          {notifications.length > 0 ? (
            <div
              onClick={(e) => deleteAllNotifications(e)}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '0 0 4px 10px',
              }}
            >
              Delete all
            </div>
          ) : (
            <div style={{ paddingLeft: '10px' }}>
              There are no notifications for you
            </div>
          )}
          <div
            className={styless.scrollbar}
            style={{ maxHeight: `calc(100vh - 150px)`, overflowY: 'auto' }}
          >
            {notifications &&
              notifications.map((item) => {
                return <OneNotification notification={item} key={item.id} />;
              })}
            {notifications.length > 9 && (
              <div
                className={style.threeDots}
                onClick={() => {
                  setLimitNumber((prev) => prev + 10);
                }}
              >
                <TickDown />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
