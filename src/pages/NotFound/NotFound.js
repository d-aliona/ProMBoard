import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import style from '../../assets/scss/signup.module.scss';

function NotFound() {
  const user = useSelector((state) => state.user.user);
  return (
    <div
      className={style.container}
      style={{
        paddingTop: '200px',
        fontSize: '20px',
        lineHeight: '2',
        textAlign: 'center',
      }}
    >
      {!user.email && (
        <div>
          <p style={{ paddingBottom: '30px' }}> Page Not Found. </p>
          <p> Please, welcome to our </p>
          <p>
            <Link to="/" className="text-danger">
              {' '}
              Start Page{' '}
            </Link>
          </p>
        </div>
      )}
      {!!user.email && (
        <div>
          <p style={{ paddingBottom: '30px' }}> Page Not Found. </p>
          <p> Please, welcome to your </p>
          <p className="text-reset">
            <Link to="/" className="text-danger">
              {' '}
              Home Page{' '}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default NotFound;
