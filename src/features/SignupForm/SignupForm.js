import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Input from '../../components/Input'
import { usersState } from '../../store/slices/usersSlice'
import style from '../../assets/scss/signupForm.module.scss'
import { ShowPassword, HidePassword } from '../../assets/svg/svg-icons'

const SignupForm = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passConfirmed, setPassConfirmed] = useState('')
    const [isRevealPwd1, setIsRevealPwd1] = useState(false)
    const [isRevealPwd2, setIsRevealPwd2] = useState(false)
    const [showErrorEmail, setShowErrorEmail] = useState(false)
    const [showErrorPass, setShowErrorPass] = useState(false)
    const disabled = firstName && lastName && email && password && passConfirmed ? '' : style.disabled
    const users = useSelector(usersState)

    let navigate = useNavigate()

    const createUser = (e) => {
        e.preventDefault()

        if (email.match(regex)) {
            setShowErrorEmail(false)

            if (password === passConfirmed && password.trim().length >= 6) {
                setShowErrorPass(false)

                if (users.some(el => el.email === email)) {
                    navigate('../auth/home')
                } else {
                    const auth = getAuth()
                    createUserWithEmailAndPassword(auth, email, password)
                        .then(() => {
                            addDoc(collection(db, 'users'), {
                                email: email,
                                firstName: firstName,
                                lastname: lastName,
                                guestBoards: [],
                            })
                        })
                        .then(() => {
                            navigate('../auth/home')
                        })
                        .catch((error) => {
                            console.log(error.message)
                        })
                }
            } else {
                setShowErrorPass(true)
                setPassword('')
                setPassConfirmed('')
            }
        } else {
            setShowErrorEmail(true)
        }
    }

    return (
        <form className={style.form} onSubmit={createUser}>
            <Input
                type={'text'}
                placeholder={'Enter your First Name'}
                value={firstName}
                onChange={(e) => {
                    setFirstName(e.target.value)
                }}
            />
            <Input
                type={'text'}
                placeholder={'Enter your Last Name'}
                value={lastName}
                onChange={(e) => {
                    setLastName(e.target.value)
                }}
            />
            <Input
                type={'text'}
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
                    setShowErrorPass(false)
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
                    setShowErrorPass(false)
                }}
            />
            <div className={style.eye} onClick={() => setIsRevealPwd2(prev => !prev)}>
                {isRevealPwd2 ? <HidePassword /> : <ShowPassword />}
            </div>
            {!!showErrorEmail && (
                <div className={style.error}>
                    Please enter the correct email address
                </div>
            )}
            {!!showErrorPass && (
                <div className={style.error}>
                    Enter the correct new password (six or more characters) and confirm it
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
