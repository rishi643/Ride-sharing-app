import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDriver } from '@/components/context/DriverContext';
import axios from 'axios';

function RegisterDriver() {
  const navigate = useNavigate();

  let uppercase = false, lowercase = false, onedigit = false, specialchar = false;
  const[error,seterror]= useState("")
  const [FormData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    DOB: "",
    PhoneNo: "",
    LicenseNo: "",
    LicenseExpDate: "",
    VechileType: "",
    LONGITUDE:"",
    LATITUDE:""
  })
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(FormData);
   
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { longitude, latitude } = position.coords;

            setFormData(prev => {
                const updatedFormData = {
                    ...prev,
                    LONGITUDE: longitude,
                    LATITUDE: latitude
                };

            
                if (updatedFormData.LONGITUDE && updatedFormData.LATITUDE) {
                    console.log(updatedFormData.LATITUDE, updatedFormData.LONGITUDE);
                    
                    axios.post(String(import.meta.env.VITE_REGISTER_LINK), updatedFormData)
                        .then(() => navigate("/LoginDriver"))
                        .catch((error) => {
                            if (error.response) {
                                seterror(error.response.data);
                            } else {
                                seterror(error.message);
                            }
                        });
                } else {
                    console.error("Updated FormData does not contain coordinates");
                    seterror("Unable to fetch location coordinates");
                }

               
                return updatedFormData;
            });
        },
        (err) => {
            console.log("ERROR FETCHING LOCATION:", err);
            seterror("UNABLE TO FETCH YOUR LOCATION");
        }
    );
}









    


  return (
    <>
      <div className='overflow-x-hidden w-screen h-screen bg-gradient-to-tr from-purple-600 to-black'>
        <Link to="/HOME" className=' p-5 text-white'>
          HOME
        </Link>
        <Link to="./About" className=' p-5 text-white'>
          ABOUT
        </Link>

        <h1 className="mt-10 md:mt-0 text-center font-sans font-bold p-5 text-4xl text-white">
          Welcome to Our Service
        </h1>
        <h1 className='text-lg mt-10 uppercase text-center text-white '>
          Submit all These Information To Register
        </h1>
        <form className=' p-10 text-lg font-sans bg-black font-semibold mx-auto mt-11 md:grid grid-cols-2 text-center h-auto' onSubmit={handlesubmit}>
          <div className='flex flex-col items-center gap-10 font-sans mb-10 text-2xl font-bold text-white'>

            <h1>DRIVE WITH US</h1>
            <img src="https://img.freepik.com/premium-photo/happy-young-male-driver-wheel_136930-4.jpg" alt="" />
            <img src="https://st2.depositphotos.com/1518767/6555/i/450/depositphotos_65555063-stock-photo-young-man-smiling-and-showing.jpg" alt="" />
            <img src="https://img.freepik.com/free-photo/man-working-as-truck-driver-posing_23-2151489656.jpg" alt="" />
          </div>
          <div className='flex flex-col gap-6 text-white  items-center text-balance'>
            <label>Plese Enter Your Full Name</label>
            <label className=' text-yellow-400'>Format=ELIZABETH-OLSEN</label>
            <input type="text" value={FormData.FullName} onChange={e => {
              setFormData(prev => (
                {
                  ...prev,
                  FullName: e.target.value
                }
              ))
            }} className=' outline-none border-2   uppercase  p-2 text-black border-black ' />
            <label>Plese Enter Your Email</label>

            <input type="text" onChange={e => {
              setFormData(prev => (
                {
                  ...prev,
                  Email: e.target.value
                }
              ))
            }} value={FormData.Email} className='outline-none border-2    p-2 text-black border-black ' />

            <label >Plese Create New Password<br />
              <div className='mt-6 text-yellow-400 flex flex-col gap-5'>
                <div id='uppercase' className=' h-auto'>
                  Contains at least one uppercase letter ([A-Z])
                </div>
                <div id='lowercase'>
                  Contains at least one lowercase letter ([a-z])
                </div>
                <div id='onedigit'>
                  Contains at least one digit([0-9])
                </div>
                <div id='specialchar'>

                  Contains at least one special character from the set @$!%*?&
                </div>
                <div id='long'>
                  It should be atleast 8 characters long
                </div>

              </div>
            </label>

            <input onInput={(e) => {

              const PasswordTest = /^(?=.*[A-Z]).(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              if (/^(?=.*[A-Z]).*$/.test(e.target.value)) {
                uppercase = true;
                document.getElementById("uppercase").textContent = "";

              }
              else {
                uppercase = false;
                document.getElementById("uppercase").innerText = "Contains at least one Uppercase letter ([A-Z])";

              }
              if (/^(?=.*[a-z]).*$/.test(e.target.value)) {
                lowercase = true;
                document.getElementById("lowercase").innerText = "";
              }
              else {
                lowercase = false;
                document.getElementById("lowercase").innerText = "Contains at least one Lowercase letter ([a-z])";

              }
              if (/^(?=.*[0-9]).*$/.test(e.target.value)) {
                onedigit = true;
                document.getElementById("onedigit").innerText = "";
              }
              else {
                onedigit = false;
                document.getElementById("onedigit").innerText = "Contains at least one digit([0-9])";

              }
              if (/^(?=.*[@$!%*?&]).*$/.test(e.target.value)) {
                specialchar = true;
                document.getElementById("specialchar").innerText = "";
              }
              else {
                specialchar = false;
                document.getElementById("specialchar").innerText = "Contains at least one special character from the set @$!%*?&";

              }
              if ((uppercase && lowercase && onedigit && specialchar) && PasswordTest.test(e.target.value)) {
                document.getElementById("long").innerText = "";

              }
              else {
                document.getElementById("long").innerText = "It should be atleast 8 characters long";
              }
            }}



              type="text"
              onChange={e => {
                setFormData(prev => (
                  {
                    ...prev,
                    Password: e.target.value
                  }
                ))
              }} value={FormData.Password} className='outline-none border-2   p-2 text-black border-black ' />

            <label>Write Your Date Of Birth
              <div className='mt-6 text-yellow-400'>

                Format:Day/Month/Year
              </div>
            </label>
            <input type="text" onChange={e => {
              setFormData(prev => (
                {
                  ...prev,
                  DOB: e.target.value
                }
              ))
            }} value={FormData.DOB} className='outline-none border-2 uppercase p-2 text-black border-black ' />


            <label>Write Your Phone Number</label>


            <input onChange={e => {
              setFormData(prev => (
                {
                  ...prev,
                  PhoneNo: e.target.value
                }
              ))
            }} value={FormData.PhoneNo} type="text" className='outline-none border-2 uppercase p-2 text-black border-black ' />
            <label>Write Your License Number</label>


            <input onChange={e => {
              setFormData(prev => (
                {
                  ...prev,
                  LicenseNo: e.target.value
                }
              ))
            }} value={FormData.LicenseNo} type="text" className='outline-none border-2 uppercase p-2 text-black border-black ' />

            <label>Write the Exact Date when Your License Will Expire
              <div className='mt-6 text-yellow-400'>

                Format:Day/Month/Year
              </div>
            </label>


            <input onChange={e => {
              setFormData(prev => (
                {
                  ...prev,
                  LicenseExpDate: e.target.value
                }
              ))
            }} value={FormData.LicenseExpDate} type="text" className='outline-none border-2 uppercase p-2 text-black border-black ' />

            <label>Write The Type Of Your Vechile</label>
            <div className='mt-2 text-yellow-400 flex flex-col gap-5'>

              <div>Luxary</div>
              <div>Comfort</div>
              <div>Ordinary</div>
            </div>


            <input onChange={e => {
              setFormData(prev => (
                {
                  ...prev,
                  VechileType: e.target.value
                }
              ))
            }} value={FormData.VechileType} type="text" className='outline-none border-2  p-2 text-black border-black ' />
           <div>{error}</div>

           <button className='cursor-pointer rounded-2xl p-5 text-black bg-yellow-500 border-4 border-white mt-10' type='submit'>Submit</button>
          </div>
        </form>


      </div>

    </>
  )
}

export default RegisterDriver