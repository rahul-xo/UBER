import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { captainDataContext } from '../Context/captainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainProtectWrapper = ({children}) => {
    const token=localStorage.getItem("captainToken");
    const navigate=useNavigate();
    const {captainData,setCaptainData,loading,setLoading}=useContext(captainDataContext);

    useEffect(()=>{
        if(!token){
            navigate("/loginCaptain");
        }
    })

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        if(res.status===200){
            setCaptainData(res.data.captain);
            setLoading(false);

        }
    }).catch((err)=>{
        console.log(err);
        setLoading(false);
        localStorage.removeItem("captainToken");
        navigate("/loginCaptain");
    })
  return (
    <div>CaptainProtectWrapper</div>
  )
}

export default CaptainProtectWrapper