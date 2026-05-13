import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRide } from './context/rideDatacontext';
import axios from 'axios';

function Search() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const navigate = useNavigate();
  const { value, setvalue, setcoordinates, setisbothempty, setdistance, setduration, mapLoaded,setisbuttonclickedonhomepage,setisbuttonclickedonridepage,isbuttonclickedonridepage } = useRide();
  const location = useLocation();

  const MAPBOX_TOKEN = String(import.meta.env.VITE_MAPBOX_KEY);

  // Handle autocomplete for pickup field
  async function handlePickupSuggestions(value) {
    if (value.length > 2) {
      try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json`, {
          params: {
            access_token: MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
          },
          withCredentials:false
        });
        setPickupSuggestions(response.data.features);
      } catch (error) {
        console.error('Error fetching pickup suggestions:', error);
      }
    } else {
      setPickupSuggestions([]);
    }
  }

  // Handle autocomplete for destination field
  async function handleDestinationSuggestions(value) {
    if (value.length > 2) {
      try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json`, {
          params: {
            access_token: MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
          },
          withCredentials:false
        });
        setDestinationSuggestions(response.data.features);
      } catch (error) {
        console.error('Error fetching destination suggestions:', error);
      }
    } else {
      setDestinationSuggestions([]);
    }
  }

  // Fetch additional details on suggestion click
  async function onSourceClick(suggestion) {
    await setcoordinates(
      prev => (
        {
          ...prev,
          pickupcoordinates: {
            longitude: suggestion.geometry.coordinates[0],
            latitude: suggestion.geometry.coordinates[1]
          },
        })
    )



  }
  async function ondestinationClick(suggestion) {
    await setcoordinates(
      prev => (
        {
          ...prev,
          destinationcoordinates: {
            longitude: suggestion.geometry.coordinates[0],
            latitude: suggestion.geometry.coordinates[1]
          },
        })
    )
  }
  useEffect(() => {
    if (destination == "" && pickup == "") {
      setisbothempty(true);
    }
    else {
      setisbothempty(false);
    }
  }, [pickup, destination])

  useEffect(() => {
    if (location.pathname === '/Home' || location.pathname === '/') {
      setvalue({ pickup: "", destination: "" });
      setcoordinates(
        prev=>(
         
          {...prev,
            pickupcoordinates:{
              longitude:"",
              latitude:"",
            }
            ,
            destinationcoordinates:{
              longitude:"",
              latitude:"",
            }
          }
        )
      )
      setdistance(0);
      setduration(0);
    } else if (location.pathname === '/Ride') {
      if (value.destination != "" && value.pickup != "") {
        if (mapLoaded) {

          setPickup(value.pickup || '');
          setDestination(value.destination || '');
        }

      }
    }
  }, [location.pathname]);

  return (
    <div className='flex items-center gap-9 flex-col justify-center w-3/4 md:h-96 h-80 md:w-96 shadow-xl size-7'>
      <h1 className='text-4xl font-bold font-sans'>Let's Go</h1>

      {/* Pickup Input */}
      <div className='relative'>
        <div className='flex row gap-1'>

          <input
            className='bg-black font-bold h-10 pl-4 rounded-2xl text-white outline-none'
            type='text'
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value);
              handlePickupSuggestions(e.target.value);
            }}
            placeholder='Enter pickup location'
          />
          <svg className='mt-2' onClick={e => {
            setPickup("");
            setcoordinates(
              prev => (
                {
                  ...prev,
                  pickupcoordinates: {
                    longitude: "",
                    latitude: ""
                  }
                }
              )
            )
          }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        </div>
        <ul className='bg-white absolute top-full left-0 mt-1 w-full rounded-lg z-10'>
          {pickupSuggestions.map((suggestion) => (
            <li
              className="p-2 hover:bg-gray-200 cursor-pointer"
              key={suggestion.id}
              onClick={() => {
                setPickup(suggestion.place_name);
                setPickupSuggestions([]);
                onSourceClick(suggestion);
              }}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>

      {/* Destination Input */}
      <div className='relative'>
        <div className='flex row gap-1'>
          <input
            className='bg-black font-bold h-10 pl-4 rounded-2xl text-white outline-none'
            type='text'
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              handleDestinationSuggestions(e.target.value);
            }}
            placeholder='Enter destination'
          />
          <svg className='mt-2' onClick={e => {
            setDestination("");

            setcoordinates(
              prev => (
                {
                  ...prev,
                  destinationcoordinates: {
                    longitude: "",
                    latitude: ""
                  }
                }
              )
            )



          }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></div>
        <ul className='absolute top-full left-0 mt-1 w-full bg-white h-auto rounded-lg z-10'>
          {destinationSuggestions.map((suggestion) => (
            <li
              className="p-2 hover:bg-gray-200 cursor-pointer"
              key={suggestion.id}
              onClick={() => {
                setDestination(suggestion.place_name);
                setDestinationSuggestions([]);
                ondestinationClick(suggestion);
              }}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => {
          if(location.pathname=="/Ride"){
            setvalue({ pickup, destination });
            setisbuttonclickedonridepage(true);
            setisbuttonclickedonhomepage(false);
          }
          else{
            setvalue({ pickup, destination });
            setisbuttonclickedonridepage(false);
            setisbuttonclickedonhomepage(true);
            navigate('/Ride');
           }
        }}
        className='bg-black rounded-lg text-white font-sans font-bold w-28 h-12'
      >
        Search Rides
      </button>
    </div>
  );
}

export default Search;
