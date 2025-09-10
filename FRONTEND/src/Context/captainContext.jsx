import React, { createContext, useContext, useState } from 'react'

export const captainDataContext=createContext();



const CaptainContext=({children})=>{
    const [captain,setCaptain]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    const updateCaptain=(captainData)=>{
        setCaptain(captainData);
    }

    const value={
        captain,
        setCaptain,
        loading,
        setLoading,
        error,
        setError,
        updateCaptain
    }

    return(
        <captainDataContext.Provider value={value}>
            {children}
        </captainDataContext.Provider>
    )
}

export default CaptainContext