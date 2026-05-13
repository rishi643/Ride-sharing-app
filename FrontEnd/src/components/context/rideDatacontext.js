import React, { useContext, useState } from 'react'


const Ridecontext=React.createContext({
value:{
    pickup:"",
    destination:""
},

coordinates:{
    pickupcoordinates:{
        longitude:null,
        latitude:null
    },
    destinationcoordinates:{
        longitude:null,
        latitude:null
    }
},
distance:null,
duration:null,
isbuttonclickedonridepage:false,
setisbuttonclickedonridepage:()=>{},
isbuttonclickedonhomepage:false,
setisbuttonclickedonhomepage:()=>{},

})

export const Ridecontextprovider=Ridecontext.Provider;

export const useRide=()=>{
    return useContext(Ridecontext);
}