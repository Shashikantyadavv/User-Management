import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/userSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      dispatch(setToken(response.data.token));
      alert('Login Successful');
    } catch (error) {
      console.error(error);
      alert('Login Failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
        <p className="mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
