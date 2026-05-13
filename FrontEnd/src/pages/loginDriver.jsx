import React, { useState } from 'react'
import { useDriver } from '@/components/context/DriverContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginDriver() {
  const navigate = useNavigate();
  const { setisLogin } = useDriver();
  const [error, seterror] = useState('');
  const [FormData, setFormData] = useState({

    Email: "",
    Password: "",

  })

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post(`${import.meta.env.VITE_LOGIN_LINK}`, FormData);
      setisLogin(true);

      navigate("/Drive");
    } catch (error) {
      console.log("notok");
      if (error.response) {
        seterror(error.response.data);
      }
      else {
        seterror(error.message);
      }
    }

  }
  return (
    <>

      <Link to="/HOME" className='ml-11 m-9 p-5'>
        HOME
      </Link>

      <form onSubmit={handlesubmit}>
        <input type="text" value={FormData.Email} onChange={e => setFormData(prev => ({
          ...prev,
          Email: e.target.value
        }))} /><br />
        <input type="text" value={FormData.Password} onChange={e => setFormData(prev => ({
          ...prev,
          Password: e.target.value
        }))} /><br />
        <button type='submit'>Submit</button>
        <div className='text-black'>{error}</div>
      </form>
      <button onClick={() => navigate("/RegisterDriver")}>Register</button>
    </>
  )
}

export default LoginDriver