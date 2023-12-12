import {Navigate, Outlet} from 'react-router-dom';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const PublicRoute = () => {
  const {currentUser} = useContext(AuthContext);
  
  return !currentUser ? <Outlet /> : <Navigate to='/dashboard' replace={true} />;
};