import Search from '../components/search';
import Mapdisplay from '../components/MapDisplay';
import { useRide } from '../components/context/rideDatacontext';
import { useEffect } from 'react';

function Ridepage() {
 const {coordinates,distance,duration,isbuttonclickedonridepage}=useRide();
 
 const formatDistance = (distance) => {
  
if(distance=="No Route"){
  return "No Route"
}
   if (distance < 1000) {
     return `${Math.floor(distance)} m`;
   } else {
     return `${Math.floor(distance / 1000)} kilometers`;
   }
 };

const formatDuration = (duration) => {


if(isbuttonclickedonridepage){
  async function senddata(){
      const Params=new URLSearchParams();
      
      Params.append("Name","Rohan");
      Params.append("PickupLocation","Jamananagar");
      Params.append("Destination","Delhi");
      Params.append("PickupTime",Date.now());
      Params.append("VehicleType","Luxary");
      Params.append("FareEstimate","568");
      console.log(coordinates);
      
      Params.append("pickupcoordinateslongitude",coordinates.pickupcoordinates.longitude);
      Params.append("pickupcoordinateslatitude",coordinates.pickupcoordinates.latitude);
      Params.append("destinationcoordinateslongitude",coordinates.destinationcoordinates.longitude);
      Params.append("destinationcoordinateslatitude",coordinates.destinationcoordinates.latitude);
      console.log(import.meta.env.VITE_CUSTOMER_LINK);
      
      await fetch(`${import.meta.env.VITE_CUSTOMER_LINK}?${Params}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }  
      }).then(res=>{
        console.log(res.data);
      })
  }
  senddata();
}



if(duration=="No Route"){
  return "No Route"
}

  const minutes = Math.floor(duration / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);


  if (days > 1) {
    return `${days} days`;
  } else if (days === 1) {
    return '1 day';
  } else if (hours > 1) {
    return `${hours} hours`;
  } else if (hours === 1) {
    return '1 hour';
  } else if (minutes > 1) {
    return `${minutes} minutes`;
  } else if (minutes === 1) {
    return '1 minute';
  } else {
    return '0 minute';
  }
};

 return (
 <div className='flex flex-col md:ml-11 md:flex-row items-center mt-10 gap-8 flex-wrap'>
   <Search />
   <Mapdisplay/>
   <div className='border-2 border-pink-500 flex flex-col  text-pink-600 scale-110 '>
       <input className='bg-black font-bold outline-none text-center p-2' type="text" readOnly value={formatDistance(distance)} />
       <input className='bg-black font-bold outline-none text-center p-2' type='text' readOnly value={formatDuration(duration)}/>
   
   </div>
 {/* {
  isbuttonclickedonridepage?(
  
  ):null
 } */}
 </div>
  )
}

export default Ridepage;