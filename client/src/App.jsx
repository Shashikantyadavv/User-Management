import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';

const App = () => {
  const token = useSelector((state) => state.user.token); 
  console.log(token);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token!=null ?  <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={token!=null ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
