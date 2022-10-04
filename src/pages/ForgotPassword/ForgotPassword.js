import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase-client';

import Logo from '../../ui/Logo';
import Input from '../../ui/Input';
import style from '../../assets/scss/signup.module.scss';
import styles from '../../assets/scss/signupForm.module.scss';

const ForgotPassword = () => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const disabled = email ? '' : styles.disabled;

  const user = useSelector((state) => state.user.user);

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.match(regex)) {
      setShowErrorEmail(false);

      try {
        setMessage('');
        setError('');
        await resetPassword(email);
        setMessage('Check your inbox for further instructions');
      } catch {
        setError('Failed to reset password');
      }
    } else {
      setShowErrorEmail(true);
    }
  };

  return (
    <>
      <div className={style.container}>
        <Logo />
        <div className={style.signup_wrapper}>
          <h2 className={style.header}>Forgot Your Password?</h2>
          {!message ? (
            <>
              <p className={style.infoText}>
                Just enter your email address below <br></br>
                and we'll send you a link <br></br>
                to reset your password!
              </p>
              <form
                onSubmit={handleSubmit}
                style={{ width: '80%', padding: '20px 0 10px' }}
              >
                <Input
                  type={'text'}
                  placeholder={'Enter email'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setShowErrorEmail(false);
                  }}
                />
                <div className={style.element}>
                  <button
                    type="submit"
                    className={`${styles.button} ${disabled}`}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              {!!showErrorEmail && (
                <div className={styles.error}>
                  Please enter the correct email address
                </div>
              )}
              {error && <div className={styles.error}>{error}</div>}
            </>
          ) : (
            <div>
              <h2 className={style.infoText}>Thank You!</h2>
              {message && <div className={style.infoText}>{message}</div>}
            </div>
          )}
          <hr className={style.line} />
          {!user.email && (
            <Link to="/login" className={style.login}>
              {' '}
              Login{' '}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
