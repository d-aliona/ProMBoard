import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { usersState } from '../../store/slices/usersSlice';
import style from '../../assets/scss/signup.module.scss';
import { GoogleSvg } from '../../assets/svg/svg-icons';

const SignupGoogleForm = (props) => {
  const title = props.title;
  let navigate = useNavigate();
  const users = useSelector(usersState);

  const signupGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        if (!users.some((el) => el.email === user.email)) {
          addDoc(collection(db, 'users'), {
            email: user.email,
            firstName: user.displayName.split(' ')[0],
            lastName: user.displayName.split(' ')[1],
            guestBoards: [],
          });
        } else {
          const userFound = users.find((el) => el.email === user.email);

          if (userFound.firstName === '?' && userFound.lastName === '?') {
            const docRef = doc(db, 'users', userFound.id);
            await updateDoc(docRef, {
              firstName: user.displayName.split(' ')[0],
              lastName: user.displayName.split(' ')[1],
            });
          }
        }
      })
      .then(() => {
        navigate('../auth/home');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <button className={style.button} type="button" onClick={signupGoogle}>
      <GoogleSvg />
      <span>{title} with Google</span>
    </button>
  );
};

export default SignupGoogleForm;
