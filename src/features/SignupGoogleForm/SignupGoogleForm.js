import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { usersState } from '../../store/slices/usersSlice'
import style from '../../assets/scss/signup.module.scss'
import { GoogleSvg } from '../../assets/svg/svg-icons'

const SignupGoogleForm = (props) => {
    const title = props.title
    let navigate = useNavigate()
    const users = useSelector(usersState)
    // console.log(users)

    const signupGoogle = (e) => {
        e.preventDefault()
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // console.log(user.email, user.displayName)
            
            if (!users.some(el => el.email === user.email)) {
                addDoc(collection(db, 'users'),{
                    email: user.email,
                })
            }
        })
        .then(() => {
            navigate('../auth/home')
        })
        .catch((error) => {
            const errorMessage = error.message
            console.log(errorMessage)
        })
    }
  return (
    <button 
        className={style.button}
        type='button'
        onClick={signupGoogle}
    >
        <GoogleSvg />
        <span>{title} with Google</span>
    </button>

  )
}

export default SignupGoogleForm
