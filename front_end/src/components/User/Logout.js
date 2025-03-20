import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../assets/styles/style.css'

const Logout = () => {

  
  const navigate=useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <button class="button-8"  style={{borderRadius:3,backgroundColor:"#e1ecf4",color:"#39739d",fontSize:16}} onClick={logout}>Logout</button>
  )
}

export default Logout

