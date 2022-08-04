import React from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../../components/Logo'
import SignupForm from '../../features/SignupForm'
import { GoogleSvg } from '../../assets/svg/svg-icons'

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
                <button 
                    className={style.button}
                    type='button'
                    >
                    <GoogleSvg />
                    <span>Sign up with Google</span>
                </button>
                <hr className={style.line} />
                <div className={style.login} onClick={logIn}>
                    Already have an account? Log in
                </div>
            </div>
        </div>
    )
}

export default Signup