import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { onSnapshot } from 'firebase/firestore';
import { usersCollection } from '../../firebase-client';

import { setUsers } from '../../store/slices/usersSlice';
import Logo from '../../ui/Logo';
import style from '../../assets/scss/start.module.scss';

const Start: React.FC = () => {
  const currentUser = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logIn = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    navigate('login');
  };

  const signUp = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate('signup');
  };
  
  useEffect(() => {
    onSnapshot(usersCollection, (snapshot) => {
      const userSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as User;
      });
      dispatch(setUsers(userSnap));
    });
  }, []);

  return (
    <div className={style.container}>
      {!currentUser.email && (
        <>
          <header className={style.header}>
            <Logo />
            <div className={style.header_login} onClick={logIn}>
              <span className={style.login}>Log in</span>
            </div>
          </header>
          <main className={style.main}>
            <div style={{ textAlign: 'center' }}>
              <p className={style.motto}>Collaborate and manage projects </p>
              <p className={style.motto}>
                with <span style={{ fontWeight: '800' }}>ProMBoard</span>!
              </p>
              <button className={style.signup_button} onClick={signUp}>
                Sign up
              </button>
            </div>
            <div className={style.start_img}></div>
          </main>
          <footer className={style.footer}>
            <div>Copyright © ProMBoard 2022</div>
          </footer>
        </>
      )}
      {currentUser.email && <Navigate to="auth/home" />}
    </div>
  );
}

export default Start;
