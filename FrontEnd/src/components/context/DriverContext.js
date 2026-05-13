import React, { useContext } from 'react'

const DriverContext=React.createContext({
    
    isLogin:false,
    setisLogin:()=>{}

})


export  const  DriverContextProvider=DriverContext.Provider;
export const useDriver=()=>{
    return useContext(DriverContext);
}


export default DriverContext