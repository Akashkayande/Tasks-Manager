import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import './Login.css'
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const { dispatch } = useTask();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && pass && name) {
      dispatch({ type: 'LOGIN', payload: 'dummy-token' });
      toast.success("login successfully");
      navigate('/');
    }
  };

  return (
    <div className="form-container">
      <div className="login-form">
      <h2>Login</h2>
      <input type='text'value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name'/> 
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
      <input type='password' value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Enter Password'/>
      <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;