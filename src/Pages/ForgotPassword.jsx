import React from 'react'
import { useState,useEffect } from 'react'

 function ForgotPassword(onSubmit) {
    const [otp,setOtp] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit({otp,password});
    };


  return (
   
   <form onSubmit={handleSubmit}>
    <label>Enter OTP</label>
    </form>

  )

 };
export default ForgotPassword;