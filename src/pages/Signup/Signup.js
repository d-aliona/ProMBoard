import React from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../../ui/Logo'
import SignupForm from '../../features/SignupForm'
import SignupGoogleForm from '../../features/SignupGoogleForm'

import style from '../../assets/scss/signup.module.scss'

const Signup = () => {
  let navigate = useNavigate()

  const logIn = (e) => {
    e.preventDefault()
    navigate('../login')
  }
  
    return (
        <div className={style.container}>
            <Logo />
            <div className={style.signup_wrapper}>
                <h2 className={style.header}>Sign up for your account</h2>
                <SignupForm />
                <p style={{margin: '10px'}}>or</p>
                <SignupGoogleForm title={'Sign up'}/>
                <hr className={style.line} />
                <div className={style.login} onClick={logIn}>
                    Already have an account? Log in
                </div>
            </div>
        </div>
    )
}

export default Signup