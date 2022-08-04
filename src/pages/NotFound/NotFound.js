import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NotFound() {
  const user = useSelector((state) => state.user.user)
  return (
    <>
      {!user.email && (
        <div className="w-100 text-center fs-3" style={{ marginTop: '160px' }}>
          <p> Page Not Found. </p>
          <p> Please, welcome to our </p>
          <p>
            <Link to="/" className="text-danger">
              {' '}
              Start Page{' '}
            </Link>
          </p>
        </div>
      )}
       {!!user.email && (
        <div className="w-100 text-center fs-3" style={{ marginTop: '160px' }}>
          <p> Page Not Found. </p>
          <p> Please, welcome to your </p>
          <p className="text-reset">
            <Link to="/" className="text-danger">
              {' '}
              Home Page{' '}
            </Link>
          </p>
        </div>
      )}
    </>
  )
}

export default NotFound