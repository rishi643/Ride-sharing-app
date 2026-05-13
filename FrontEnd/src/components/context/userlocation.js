import React from 'react'
import { useContext } from 'react';

let userlocationcontext=React.createContext({
    userlocation:{
        longitude:null,
        latitude:null
    },
   
})

export const Userlocationprovider=userlocationcontext.Provider;

export const useUserlocation=()=>{
    return useContext(userlocationcontext);
}

