import React from 'react'
import { useNavigate } from 'react-router-dom'

import SignupGoogleForm from '../../features/SignupGoogleForm'
import Logo from '../../components/Logo'
import LoginForm from '../../features/LoginForm'
import style from '../../assets/scss/signup.module.scss'

const Login = () => {
  let navigate = useNavigate()

  const forgotPassword = (e) => {
    e.preventDefault()
    navigate('../forgot-password')
  }

  return (
    <div className={style.container}>
            <Logo />
            <div className={style.signup_wrapper}>
                <h2 className={style.header}>Log in to ProMBoard</h2>
                <LoginForm />
                <p style={{margin: '10px'}}>or</p>
                <SignupGoogleForm title={'Log In'}/>
                <hr className={style.line} />
                <div className={style.login} onClick={forgotPassword}>
                    Forgot your password?
                </div>
            </div>
        </div>
  )
}

export default Login