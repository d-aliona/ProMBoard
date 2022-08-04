import React from 'react'

import { useNavigate, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Logo from '../../components/Logo'

import style from '../../assets/scss/start.module.scss'

function Start() {
  const currentUser = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  const logIn = (e) => {
    e.preventDefault()
    navigate('login')
  }

  const signUp = (e) => {
    e.preventDefault()
    navigate('signup')
  }

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
            <div style={{textAlign: 'center'}}>
              <p className={style.motto}>Collaborate and manage projects </p>
              <p className={style.motto}>
                with <span style={{fontWeight: '800'}}>ProMBoard</span>!
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
      {!!currentUser.email && <Navigate to="auth/home" />}
    </div>
  )
}

export default Start