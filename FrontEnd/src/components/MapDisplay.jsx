import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useUserlocation } from './context/userlocation';
import Map, { Layer, Marker, NavigationControl, Source } from 'react-map-gl';
import { useRide } from './context/rideDatacontext';
import axios from 'axios';

export default function Mapdisplay() {
  const { userlocation, setuserlocation } = useUserlocation();
  const [pickuplocation, setpickuplocation] = useState({})
  const [destinationlocation, setdestinationlocation] = useState({});
  const [showusermarker, setshowusermarker] = useState(true);
  const [sourcermarker, setsourcemarker] = useState(false);
  const [destinationmarker, setdestinationmarker] = useState(false);
  const { value, coordinates, setcoordinates, isbothempty, setdistance, setduration, setMapLoaded, mapLoaded } = useRide();
  const mapref = useRef();
  const [routecoordinates, setroutecoordinates] = useState(null);



  function getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };
          resolve(location);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setuserlocation(location);
        setshowusermarker(true);

        setMapLoaded(true);
      })
      .catch((error) => {
        console.error('Error getting location:', error);
      });
  }, [setuserlocation]);




  useEffect(() => {

    if (mapref.current) {


      if (isbothempty) {

        mapref.current.flyTo({
          center: [userlocation.longitude, userlocation.latitude], 
          duration: 2500
        })
        setshowusermarker(true);
        setsourcemarker(false);
      }
      else {
        setshowusermarker(false);

      }
    }
  }, [isbothempty])






  useEffect(() => {
    if (coordinates.pickupcoordinates.latitude != "") {

      const updatedPickuplocation = {
        longitude: coordinates.pickupcoordinates?.longitude,
        latitude: coordinates.pickupcoordinates?.latitude,
      };

      setpickuplocation(updatedPickuplocation);

      if (mapref.current && updatedPickuplocation.longitude && updatedPickuplocation.latitude) {
        mapref.current.flyTo({
          center: [updatedPickuplocation.longitude, updatedPickuplocation.latitude],
          duration: 2500,

        });
      }
      setshowusermarker(false);
      setsourcemarker(true);

    }
    else {
      mapref.current ?

        mapref.current.flyTo({
          center: [userlocation.longitude, userlocation.latitude], 
          duration: 2500
        })
        : null;
      setsourcemarker(false);
      setshowusermarker(true);
      setroutecoordinates(false);
      setdestinationmarker(false);
    }


  }, [coordinates.pickupcoordinates]); 

  useEffect(() => {
    
    if (coordinates.destinationcoordinates.latitude != "") {

      const updateddestination = {
        longitude: coordinates.destinationcoordinates.longitude,
        latitude: coordinates.destinationcoordinates.latitude
      };

     
      setdestinationlocation(updateddestination);


      if (mapref.current && updateddestination.longitude && updateddestination.latitude) {
        mapref.current.flyTo({
          center: [updateddestination.longitude, updateddestination.latitude],
          duration: 2500
        });
      }
      setshowusermarker(false);
      setdestinationmarker(true);

    }
    else {
      if (coordinates.pickupcoordinates.latitude != "") {
        mapref.current.flyTo({
          center: [pickuplocation.longitude, pickuplocation.latitude],
          duration: 2500
        });
        setsourcemarker(true);
        setdestinationmarker(false);
        setroutecoordinates(false);

      }
    }

    

  }, [coordinates.destinationcoordinates]); 

  useEffect(() => {
   
    if (
      pickuplocation.longitude != null && pickuplocation.latitude != null &&
      destinationlocation.longitude != null && destinationlocation.latitude != null
    ) {
      const fetchDirections = async () => {
        try {
          setsourcemarker(true);
          setdestinationmarker(true);
          const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${pickuplocation.longitude},${pickuplocation.latitude};${destinationlocation.longitude},${destinationlocation.latitude}?geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_KEY}`,{
                withCredentials:false
            }
          );
          console.log(response);

          setroutecoordinates(response.data.routes[0].geometry.coordinates);

          setdistance(response.data.routes[0].distance);
          setduration(response.data.routes[0].duration);
        } catch (error) {
          console.error("Error fetching directions:", error);
          setdistance("No Route");
          setduration("No Route");
        }
      };

      fetchDirections();
    }
    if (mapref.current && pickuplocation.longitude && pickuplocation.latitude && destinationlocation.longitude && destinationlocation.latitude) {
      const bounds = [
        [pickuplocation.longitude, pickuplocation.latitude],   // Southwest corner of the bounding box
        [destinationlocation.longitude, destinationlocation.latitude]  // Northeast corner of the bounding box
      ];

      mapref.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 }, // Optional: padding around the bounding box
        maxZoom: 15, // Optional: maximum zoom level
        duration: 2000 // Optional: animation duration in milliseconds
      });
    }
  }, [pickuplocation, destinationlocation]);


  if (!mapLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="w-80 h-80 border-4 md:w-96 md:h-96">
      <Map
        ref={mapref}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY} // Replace with your access token
        initialViewState={{
          longitude: userlocation.longitude,
          latitude: userlocation.latitude,
          zoom: 14,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl
          showCompass="true"
        />
        {showusermarker ? (<Marker
          longitude={userlocation.longitude}
          latitude={userlocation.latitude}
          anchor="bottom"
          style={{ width: '9%', height: '9%' }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740_1280.png"
            alt="marker"
          />
        </Marker>) : null}
        {

          sourcermarker ? (<Marker
            longitude={pickuplocation.longitude}
            latitude={pickuplocation.latitude}
            anchor="bottom"
            style={{ width: '9%', height: '9%' }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740_1280.png"
              alt="marker"
            />
          </Marker>) : null}
        {
          destinationmarker ?
            (<Marker
              longitude={destinationlocation.longitude}
              latitude={destinationlocation.latitude}
              anchor="bottom"
              style={{ width: '9%', height: '9%' }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740_1280.png"
                alt="marker"
              />
            </Marker>) : null
        }
        {routecoordinates ? (<Source type="geojson"
          data={
            {

              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: routecoordinates
              }
            }
          }>
          <Layer
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "square"
            }
            }
            paint={{
              "line-color": "green",
              "line-width": 4
            }}


          />
        </Source>) : null}











      </Map>
    </div>
  );
}
