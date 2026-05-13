import React from "react";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/clerk-react";

//I WILLCORRECT THE STYLING OF IMAGE LATER
function Sign(){
return(
<>
<div className="flex w-screen h-screen items-center justify-center relative">
      <div
        style={{
          backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/127/697/150/gangster-ride-car-tuning-lowrider-bmw-colorful-wallpaper-preview.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
          position: 'absolute', 
          top: 0,
          left: 0,
          zIndex: -1,
         
           overflow:"hidden"
        }}
      />

      <div className="absolute top-40">
        <SignIn />
      </div>
    </div>




 
   

</>

)
}
export default Sign;