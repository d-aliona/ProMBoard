import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../firebase-client'

import Input from '../../ui/Input'

import style from '../../assets/scss/signupForm.module.scss'
import { ShowPassword, HidePassword } from '../../assets/svg/svg-icons'

const LoginForm = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRevealPwd1, setIsRevealPwd1] = useState(false)
    const [showErrorEmail, setShowErrorEmail] = useState(false)
    const [showErrorPass, setShowErrorPass] = useState(false)
    const [isIncorrectData, setIsIncorrectData] = useState(false)
    const disabled = email&&password ? '' : style.disabled;

    let navigate = useNavigate()

    const loginUser = (e) => {
        e.preventDefault()

        if (email.match(regex)) {
            setShowErrorEmail(false)
            
            if (password.trim().length >= 6) {
                setShowErrorPass(false)

                signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('../auth/home')
                })
                .catch((error) => {
                    console.log(error.message)
                    setIsIncorrectData(true)
                })
 
              } else {
                setShowErrorPass(true)
                setPassword('')
              }

        } else {
            setShowErrorEmail(true)
        }
    }

  return (
    <form className={style.form} onSubmit={loginUser}>
        <Input
            type={'text'}
            placeholder={'Enter email'}
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
                setShowErrorEmail(false)
                setIsIncorrectData(false)
            }}
        />
        <Input
            type={isRevealPwd1 ? 'text' : 'password'}
            placeholder={'Enter password'}
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
                setShowErrorPass(false)
                setIsIncorrectData(false)

            }}
        />
        <div className={style.eye} onClick={() => setIsRevealPwd1(prev => !prev)}>
            {isRevealPwd1 ? <HidePassword /> : <ShowPassword />}
        </div>
        {!!showErrorEmail && (
            <div className={style.error}>
                Please enter the correct email address
            </div>
        )}
        {!!showErrorPass && (
            <div className={style.error}>
                Enter the correct password
            </div>
        )}
        {!!isIncorrectData && (
            <div className={style.error}>
                Incorrect data. Please enter the correct email and password.
            </div>
        )}
        <button
            type='submit'
            className={`${style.button} ${disabled}`}>
            Log in
        </button>
    </form>
    
  )
}

export default LoginForm
