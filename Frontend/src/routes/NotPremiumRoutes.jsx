import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth/AuthContext'
import { Navigate } from 'react-router-dom';

export const NotPremiumRoutes = ({ children }) => {

  const {user, logged} = useContext(AuthContext);

  return (user && (user.rol !== 'admin' && user.rol !== 'suscriber'))
  ? children
  : <Navigate to='/'/>
}