import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth/AuthContext'
import { Navigate } from 'react-router-dom';

export const PremiumRoutes = ({ children }) => {

    const {user, logged} = useContext(AuthContext);

  return (logged && (user.rol === 'admin' || user.rol === 'suscriber'))
  ? children 
  : <Navigate to={'/'}/>
}
