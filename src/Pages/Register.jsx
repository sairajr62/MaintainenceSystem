import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setsubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setsubmitting(true)
    try {
      const response = await axios.post('http://localhost:5000/api/register', { email, username, password });
      
      console.log("Registered data: ", response.data);
      //alert()("Registration Successful"); 
      navigate('/login'); 
    } catch (err) {
      //alert( "Registration Failed");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="w-full max-w-md bg-black p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register Here</h1>
        <form onSubmit={handleRegister} className="space-y-5">
          <label className="block text-gray-600 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-gray-600 font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-gray-600 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit" disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
           {submitting ? "Registering..." : "Register"}
          </button>
        </form>
        </div>
      </div>
    </>
  );
};

export default Register;
