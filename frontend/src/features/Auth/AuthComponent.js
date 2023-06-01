import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthComponent = ({ path, element }) => {
    const accessToken = localStorage.getItem('accessToken');

    return accessToken ? <Navigate to="/" /> : <Outlet />
  };
  
  export default AuthComponent;