import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

const RequireAuth: React.ComponentType<ChildrenProps> = ({ children }) => {
  const user = useAppSelector((state) => state.user.user);

  if (user.email) {
    <Navigate to="auth/" />;
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default RequireAuth;
