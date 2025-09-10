import React, { useContext } from 'react'
import { UserDataContext } from '../Context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({children}) => {
    const navigate=useNavigate();
    const {userData}=useContext(UserDataContext);
    const token=localStorage.getItem('token');

    if(!token){
      return <Navigate to='/loginUser'/>;
    }
  return (<>
    {children}
    </>
  )
}

export default UserProtectWrapper