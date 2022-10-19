import React, { useState } from 'react';

import { auth } from '../../firebase-client';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

import Input from '../../ui/Input';
import { ShowPassword, HidePassword } from '../../assets/svg/svg-icons';
import style from '../../assets/scss/profile.module.scss';
import styless from '../../assets/scss/signupForm.module.scss';

const ChangePasswordForm: React.FC<SetStateProps> = ({ setShowChangePassForm }) => {
  const user = auth.currentUser!;
  const [showError1, setShowError1] = useState(false);
  const [showError2, setShowError2] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwd1, setIsRevealPwd1] = useState(false);
  const [isRevealPwd2, setIsRevealPwd2] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirmed, setNewPassConfirmed] = useState('');
  const [message, setMessage] = useState(false);

  const disabled: string =
    currentPass && newPass && newPassConfirmed ? '' : styless.disabled;

  const handlerChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credential = EmailAuthProvider.credential(user.email as string, currentPass);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (newPass === newPassConfirmed && newPass.trim().length >= 6) {
          updatePassword(user, newPass)
            .then(() => {
              setMessage(true);
              setShowChangePassForm(false);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setShowError2(true);
          setNewPass('');
          setNewPassConfirmed('');
        }
      })
      .catch((error) => {
        console.error(error);
        setShowError1(true);
        setCurrentPass('');
      });
  };

  return (
    <>
      <form className={style.changePassForm} onSubmit={handlerChangePassword}>
        <Input
          type={isRevealPwd ? 'text' : 'password'}
          placeholder={'Enter your current password'}
          value={currentPass}
          onChange={(e) => {
            setCurrentPass(e.target.value);
            setShowError1(false);
          }}
        />
        <div
          className={styless.eye}
          onClick={() => setIsRevealPwd((prev) => !prev)}
        >
          {isRevealPwd ? <HidePassword /> : <ShowPassword />}
        </div>
        <Input
          type={isRevealPwd1 ? 'text' : 'password'}
          placeholder={'Enter your new password'}
          value={newPass}
          onChange={(e) => {
            setNewPass(e.target.value);
            setShowError2(false);
          }}
        />
        <div
          className={styless.eye}
          onClick={() => setIsRevealPwd1((prev) => !prev)}
        >
          {isRevealPwd1 ? <HidePassword /> : <ShowPassword />}
        </div>
        <Input
          type={isRevealPwd2 ? 'text' : 'password'}
          placeholder={'Confirm your new password'}
          value={newPassConfirmed}
          onChange={(e) => {
            setNewPassConfirmed(e.target.value);
            setShowError2(false);
          }}
        />
        <div
          className={styless.eye}
          onClick={() => setIsRevealPwd2((prev) => !prev)}
        >
          {isRevealPwd2 ? <HidePassword /> : <ShowPassword />}
        </div>
        <button type="submit" className={`${styless.button} ${disabled}`}>
          Change password
        </button>
        {showError1 && (
          <div style={{ color: 'red' }}>
            <p>Enter correct current password</p>
          </div>
        )}
        {showError2 && (
          <div style={{ color: 'red' }}>
            <p>
              Enter correct new password (six or more characters) and confirm it
            </p>
          </div>
        )}
      </form>
      {message && (
        <div
          style={{
            margin: '80px 10px',
            fontSize: '18px',
            lineHeight: '1.5',
            color: 'rgb(23, 43, 77)',
          }}
        >
          <p>Password has been changed successfully!</p>
          <p>Now you can log in with your new password.</p>
        </div>
      )}
    </>
  );
};

export default ChangePasswordForm;
