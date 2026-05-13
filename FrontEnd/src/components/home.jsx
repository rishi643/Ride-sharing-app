import React, { useEffect } from "react";
import Search from "./search";
import { useRide } from "./context/rideDatacontext";

function Home(){
const {setvalue}=useRide();
useEffect(()=>{
    

},[])
return(
<>
<div className="flex flex-wrap md:ml-16 gap-7 md:flex-row flex-col items-center md: mt-16">
<Search/>
<a className="md:ml-60" href="/">
<img className="" src="https://jodhpurcabservice.com/wp-content/uploads/2023/05/taxi-in-jodhpu-family.jpg" alt="no image" />
</a>
 <h1 className="md:text-7xl text-4xl font-bold font-sans">We are always with you</h1>
</div>

</>

)
}
export default Home;