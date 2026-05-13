import React, { useEffect, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { Ridecontextprovider } from './components/context/rideDatacontext.js';
import { Userlocationprovider } from './components/context/userlocation.js';
import Layout from './pages/layout.jsx';
import HomePage from './pages/HomePage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Ridepage from './pages/Ridepage.jsx';
import Sign from './components/Sign.jsx';
import DriversPage from './pages/DriversPage.jsx';
import DriverProfile from './components/DriverProfile.jsx';
import RegisterDriver from './pages/RegisterDriver.jsx';
import { DriverContextProvider } from './components/context/DriverContext.js';
import LoginDriver from './pages/loginDriver.jsx';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      [<Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />

        <Route path="/Contact" element={<Contact />} />
        <Route path="/Ride" element={<Ridepage />} />
        <Route path="/Sign" element={<Sign />} />


      </Route>,
      <Route path="/About" element={<About />} />,
      <Route path="/Drive" element={<DriversPage />} />,
      <Route path="/DriverProfile" element={<DriverProfile />} />,
      <Route path="/RegisterDriver" element={<RegisterDriver />} />,
      <Route path="/LoginDriver" element={<LoginDriver />} />
      ]
    )
  );
  const [value, setvalue] = useState({})
  const [userlocation, setuserlocation] = useState({});
  const [isbothempty, setisbothempty] = useState(true);
  const [distance, setdistance] = useState(0);
  const [duration, setduration] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isbuttonclickedonhomepage, setisbuttonclickedonhomepage] = useState(false);
  const [isbuttonclickedonridepage, setisbuttonclickedonridepage] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [coordinates, setcoordinates] = useState(
    {
      pickupcoordinates: {
        longitude: null,
        latitude: null
      },
      destinationcoordinates: {
        longitude: null,
        latitude: null
      }
    }
  )


  return (

    <Ridecontextprovider value={{
      value, setvalue, coordinates, setcoordinates, isbothempty, setisbothempty,
      distance, setdistance, duration, setduration, mapLoaded, setMapLoaded, isbuttonclickedonhomepage, setisbuttonclickedonhomepage, isbuttonclickedonridepage, setisbuttonclickedonridepage
    }}>
      <DriverContextProvider value={{ isLogin, setisLogin }}>
        <Userlocationprovider value={{ userlocation, setuserlocation }}>

          <RouterProvider router={router} />
        </Userlocationprovider>

      </DriverContextProvider>

    </Ridecontextprovider>


  );
}

export default App;
