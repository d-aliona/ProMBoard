import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
// import { db } from '../../firebase-client'
import { db, auth } from '../../firebase-client'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'

import Initials from '../../ui/Initials'
import Input from '../../ui/Input'
import { ShowPassword, HidePassword } from '../../assets/svg/svg-icons'
import style from '../../assets/scss/profile.module.scss'
import styles from '../../assets/scss/card.module.scss'
import styless from '../../assets/scss/signupForm.module.scss'

const Profile = () => {
  const curUser = useSelector((state) => state.user.user)
  const user = auth.currentUser
  const [firstName, setFirstName] = useState(curUser.firstName)
  const [lastName, setLastName] = useState(curUser.lastName)
  const [showSaveButton, setShowSaveButton] = useState(false)
  
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newPassConfirmed, setNewPassConfirmed] = useState('')
  const [showError1, setShowError1] = useState(false)
  const [showError2, setShowError2] = useState(false)
  const [message, setMessage] = useState(false)
  // const [password, setPassword] = useState('')
    // const [passConfirmed, setPassConfirmed] = useState('')
    const [isRevealPwd, setIsRevealPwd] = useState(false)
    const [isRevealPwd1, setIsRevealPwd1] = useState(false)
    const [isRevealPwd2, setIsRevealPwd2] = useState(false)
    // const [showErrorPass, setShowErrorPass] = useState(false)
    const [showChangePassForm, setShowChangePassForm] = useState(false)
  const disabled = currentPass && newPass && newPassConfirmed ? '' : styless.disabled

  const saveNameUser = async() => {
    const docRef = doc(db, 'users', curUser.id)
      await updateDoc(docRef, {
        firstName: firstName,
        lastName: lastName,
      })
    setShowSaveButton(false)
  }

  const handlerChangePassword = (e) => {
    e.preventDefault()
    const credential = EmailAuthProvider.credential(user.email, currentPass)

    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (newPass === newPassConfirmed && newPass.trim().length >= 6) {
          updatePassword(user, newPass)
            .then(() => {
              setMessage(true)
              setShowChangePassForm(false)
            })
            .catch((error) => {
              console.error(error)
            })
        } else {
          setShowError2(true)
          setNewPass('')
          setNewPassConfirmed('')
        }
      })
      .catch((error) => {
        console.error(error)
        setShowError1(true)
        setCurrentPass('')
      })
  }

  return (
    <>
      <div className={style.head}>
        <p className={style.title} >
          <Initials user={curUser}/>
          {curUser.firstName} {curUser.lastName}
        </p>
        <p className={style.email}>{curUser.email}</p>
      </div>
      <div className={style.line}></div>
      <div>
        <div style={{display:'flex', alignItems:'center'}}>
          <h2 className={style.item}>First name</h2>
          <div style={{height:'24px', width:'160px'}}>
            <Input
              type={'text'}
              value={firstName}
              onChange={(e) => {
                  setFirstName(e.target.value); setShowSaveButton(true)
              }}
              height={'26px'}
            />
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center'}}>
          <h2 className={style.item}>Last name</h2>
          <div style={{height:'24px', width:'160px'}}>
            <Input
              type={'text'}
              value={lastName}
              onChange={(e) => {
                  setLastName(e.target.value); setShowSaveButton(true)
              }}
              height={'26px'}
            />
          </div>
        </div>
      </div>
      {showSaveButton &&
        <div style={{display:'flex', margin:'30px 0 10px 186px'}}>
          <div className={styles.buttonTrue} onClick={saveNameUser}>
            Save
          </div>  
          <div className={styles.buttonCancel} 
            onClick={() => {
              setShowSaveButton(false); 
              setFirstName(curUser.firstName);
              setLastName(curUser.lastName)
            }}>
            Cancel
          </div> 
        </div>
      }
      <div style={{display:'flex', gap:'60px'}}>
        <h2 className={style.item} style={{display:'flex', gap:'15px', cursor:'pointer', height: '30px'}}
          onClick={() => setShowChangePassForm(!showChangePassForm)}>
          Change password  
          <div style={{transform: 'scale(1.4)', color:'#555'}}> &#x279C;</div>
        </h2>
        {showChangePassForm &&
          <form className={style.changePassForm} onSubmit={handlerChangePassword}>
            <Input
              type={isRevealPwd ? 'text' : 'password'}
              placeholder={'Enter your current password'}
              value={currentPass}
              onChange={(e) => {
                setCurrentPass(e.target.value)
                setShowError1(false)
              }}
            />
            <div className={styless.eye} onClick={() => setIsRevealPwd(prev => !prev)}>
                  {isRevealPwd ? <HidePassword /> : <ShowPassword />}
            </div>
            <Input
              type={isRevealPwd1 ? 'text' : 'password'}
              placeholder={'Enter your new password'}
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value)
                setShowError2(false)
              }}
            />
            <div className={styless.eye} onClick={() => setIsRevealPwd1(prev => !prev)}>
                  {isRevealPwd1 ? <HidePassword /> : <ShowPassword />}
            </div>
            <Input
              type={isRevealPwd2 ? 'text' : 'password'}
              placeholder={'Confirm your new password'}
              value={newPassConfirmed}
              onChange={(e) => {
                setNewPassConfirmed(e.target.value)
                setShowError2(false)
              }}
            />
            <div className={styless.eye} onClick={() => setIsRevealPwd2(prev => !prev)}>
              {isRevealPwd2 ? <HidePassword /> : <ShowPassword />}
            </div>
            <button
              type='submit'
              className={`${styless.button} ${disabled}`}>
              Change password
            </button>
            {showError1 && (
                <div style={{color:'red'}}>
                  <p >Enter correct current password</p>
                </div>
              )}
              {showError2 && (
                <div style={{color:'red'}}>
                  <p >
                    Enter correct new password (six or more characters) and confirm it
                  </p>
                </div>
              )}
          </form>
        }
        {message && 
          <div style={{margin:'80px 10px', fontSize:'18px', lineHeight:'1.5', color:'rgb(23, 43, 77)'}}>        
            <p >
              Password has been changed successfully!
            </p>
            <p>Now you can log in with your new password.</p>
          </div>
        }
      </div>     
    </>
  )
}

export default Profile