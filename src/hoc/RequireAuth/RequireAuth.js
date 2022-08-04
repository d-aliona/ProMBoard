import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ children }) => {
//   const user = useSelector((state) => state.member.member)

//   if (!!user.email) {
//     ;<Navigate to="auth/" />
//     return children
//   } else {
//     return <Navigate to="/" />
//   }
}

export default RequireAuth