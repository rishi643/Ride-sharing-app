import React, { useEffect, useState } from 'react';
import DriverDashboard from '../components/DriverDashboard';
import { Link, useNavigate } from 'react-router-dom';
import RegisterDriver from './RegisterDriver';
import { useDriver } from '@/components/context/DriverContext';
import axios from 'axios';
import { useRide } from '@/components/context/rideDatacontext';
import { io } from 'socket.io-client';
axios.defaults.withCredentials = true;



const socket=io("http://localhost:4000");


function DriversPage() {

  const navigate = useNavigate();
  const { isLogin, setisLogin } = useDriver();
  const [Name, setName] = useState("");
  const [Id, setId] = useState("");
  const lastlocation ={
    longitude:null,
    latitude:null
  };
  const [hidden, sethidden] = useState(true);



  async function authenticate() {

    const req = await axios.get(`${import.meta.env.VITE_AUTHENTICATION_LINK}`);

    socket.emit("connected", { Name: req.data.Name, Id: req.data.ID });

    setName(req.data.Name);
    
    setisLogin(true);
  }






  useEffect(() => {
    authenticate()
  }, []);

  useEffect(() => {
   

  
    function getlocation() {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { longitude, latitude } = pos.coords;
          if(longitude!=lastlocation.longitude && latitude!=lastlocation.latitude){
           console.log(longitude,lastlocation.longitude);
           console.log(latitude,lastlocation.latitude);
           socket.emit("location-update", { longitude, latitude });
           lastlocation.longitude=longitude;
           lastlocation.latitude=latitude;
           
          }
        },
        (err) => {
          console.log("Error getting location:", err);
        },
        {enableHighAccuracy:true}
     
      );
    }
    // getlocation();
    const intervalId = setInterval(() => {
      
      getlocation();
    }, 40000);
  
    return () => {
      clearInterval(intervalId);
     
    };
  }, []);
  
  

  const [UpcomingRideRequests, setupcomingRideRequests] = useState([
    {
      id: 1,
      name: "Sohana",
      location: "Jamnanagar",
      destination: "Rajkot",
      pickupTime: "2024-08-07T08:30:00",
      status: "Pending",
      vehicleType: "Sedan",
      fareEstimate: 450,
    },
    {
      id: 2,
      name: "Rahul",
      location: "Mumbai",
      destination: "Pune",
      pickupTime: "2024-08-07T09:00:00",
      status: "Confirmed",
      vehicleType: "SUV",
      fareEstimate: 1200,
    },
    {
      id: 3,
      name: "Anjali",
      location: "Pune",
      destination: "Mumbai",
      pickupTime: "2024-08-07T10:15:00",
      status: "Pending",
      vehicleType: "Hatchback",
      fareEstimate: 800,
    },
    {
      id: 4,
      name: "Aman",
      location: "Delhi",
      destination: "Gurgaon",
      pickupTime: "2024-08-07T11:00:00",
      status: "Pending",
      vehicleType: "Bike",
      fareEstimate: 300,
    },
    {
      id: 5,
      name: "Ritika",
      location: "Bangalore",
      destination: "Mysore",
      pickupTime: "2024-08-07T12:00:00",
      status: "Cancelled",
      vehicleType: "Sedan",
      fareEstimate: 1500,
    },
  ]);

  const [PastRides, setPastRides] = useState([

    {
      id: 5,
      name: "Sohana",
      location: "Jamnanagar",
      destination: "Rajkot",
      pickupTime: "2024-08-07T08:30:00",
      status: "Pending",
      vehicleType: "Sedan",
      fareEstimate: 450,
    },
    {
      id: 4,
      name: "Rahul",
      location: "Mumbai",
      destination: "Pune",
      pickupTime: "2024-08-07T09:00:00",
      status: "Confirmed",
      vehicleType: "SUV",
      fareEstimate: 1200,
    },
    {
      id: 3,
      name: "Anjali",
      location: "Pune",
      destination: "Mumbai",
      pickupTime: "2024-08-07T10:15:00",
      status: "Pending",
      vehicleType: "Hatchback",
      fareEstimate: 800,
    },
    {
      id: 2,
      name: "Aman",
      location: "Delhi",
      destination: "Gurgaon",
      pickupTime: "2024-08-07T11:00:00",
      status: "Pending",
      vehicleType: "Bike",
      fareEstimate: 300,
    },
    {
      id: 1,
      name: "Ritika",
      location: "Bangalore",
      destination: "Mysore",
      pickupTime: "2024-08-07T12:00:00",
      status: "Cancelled",
      vehicleType: "Sedan",
      fareEstimate: 1500,
    }

  ])

  return (
    <div className='bg-[#024950] h-auto'>
      <Link to="/DriverProfile" className=' text-white p-5'>
        Your Profile
      </Link>
      <Link to="/HOME" className='text-white ml-11 m-9 p-5'>
        HOME
      </Link>
      <button onClick={
        async (e) => {


          if (!isLogin) {


            navigate("/LoginDriver")
          }
          else {
            const res = await axios.get(`${import.meta.env.VITE_LOGOUT_LINK}`);
            console.log(res.data);;

            setisLogin(false);
          }
        }
      }>
        <div className='text-white'>

          {isLogin ? "Logout" : "Login"}
        </div>
      </button>
      {
        isLogin ? (
          <div>
            <div>

            </div>
            
            <button onClick={() => {
              sethidden(false);
            }} className='cursor-pointer rounded-2xl p-5 text-white bg-[#0FA4AF] border-4 border-black m-10' type='submit'>Open Your Dashboard</button>
            <button onClick={() => {
              sethidden(true);
            }} className='cursor-pointer rounded-2xl p-5 text-white bg-[#0FA4AF] border-4 border-black m-10' type='submit'>Close Your Dashboard</button>
          
   <div className='md:inline-flex mb-10 w-44 items-center  flex flex-col'>
   <button onClick={() => {
                 socket.emit("manual-disconnect");
                 navigate("/HOME");
            }} className='cursor-pointer  rounded-2xl p-5 text-white bg-[#0FA4AF] border-4 border-black ' type='submit'>Emergengy Close Your Duty</button>
            <label className='p-3 border-4 border-black  md:inline flex w-44 bg-orange-300 ' htmlFor="closeduty">
  Only press this button when you have no upcoming Rides Left and reload the site to come again on duty 
</label>
   </div>
       

  
            <div id='Dashboard'>
              <DriverDashboard
                UpcomingRideRequests={UpcomingRideRequests}
                PastRides={PastRides}
                setPastRides={setPastRides}
                setupcomingRideRequests={setupcomingRideRequests}
                className={`${hidden ? "hidden" : ""}`} DriverName={Name} />
            </div>
    
          </div>

        )
          : null
      }
    </div>
  )
}

export default DriversPage;
