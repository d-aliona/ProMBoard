import React, { useState } from 'react'

import Input from '../../components/Input'

import style from '../../assets/scss/signupForm.module.scss'
import { ShowPassword, HidePassword } from '../../assets/svg/svg-icons'

const SignupForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passConfirmed, setPassConfirmed] = useState('')
    const [isRevealPwd1, setIsRevealPwd1] = useState(false)
    const [isRevealPwd2, setIsRevealPwd2] = useState(false)
    const [showErrorEmail, setShowErrorEmail] = useState(false)
    const [showErrorPass1, setShowErrorPass1] = useState(false)
    const [showErrorPass2, setShowErrorPass2] = useState(false)
    const disabled = email&&password&&passConfirmed ? '' : style.disabled;

    const createUser = (e) => {
        e.preventDefault()

        // if (email.slice(1,-1).includes('@')) {
        //     console.log('ff')
        //     setShowErrorEmail(false)
        // } else {
        //     setShowErrorEmail(true)
        //     console.log('true')
        // }

        if (password === passConfirmed && password.trim().length >= 6) {
            setShowErrorPass1(false)
            console.log('ok')
          } else {
            setShowErrorPass1(true)
            setPassword('')
            setPassConfirmed('')
          }
        
        // if (newPass === newPassConfirmed && newPass.trim().length >= 6) {
        //     updatePassword(user, newPass)
        //       .then(() => {
        //         setMessage(true)
        //       })
        //       .catch((error) => {
        //         console.error(error)
        //       })
        //   } else {
        //     setShowError2(true)
        //     setNewPass('')
        //     setNewPassConfirmed('')
        //   }
    }

  return (
    <form className={style.form} onSubmit={createUser}>
        <Input
            type={'email'}
            placeholder={'Enter email'}
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
                setShowErrorEmail(false)
            }}
        />
        <Input
            type={isRevealPwd1 ? 'text' : 'password'}
            placeholder={'Enter password'}
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
                setShowErrorPass1(false)
            }}
        />
        <div className={style.eye} onClick={() => setIsRevealPwd1(prev => !prev)}>
            {isRevealPwd1 ? <HidePassword /> : <ShowPassword />}
        </div>
        <Input
            type={isRevealPwd2 ? 'text' : 'password'}
            placeholder={'Confirm your password'}
            value={passConfirmed}
            onChange={(e) => {
                setPassConfirmed(e.target.value)
                setShowErrorPass1(false)
            }}
        />
        <div className={style.eye} onClick={() => setIsRevealPwd2(prev => !prev)}>
            {isRevealPwd2 ? <HidePassword /> : <ShowPassword />}
        </div>
        {!!showErrorPass1 && (
                  <div className={style.error}>
                    Please include an '@' in the email address
                  </div>
        )}
        <button
            type='submit'
            className={`${style.button} ${disabled}`}>
            Create an account
        </button>
    </form>
    
  )
}

export default SignupForm
