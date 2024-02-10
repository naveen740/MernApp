import React, { useState } from 'react';
import './AuthForms.css'; 
import axios from 'axios'; 

const Login = ({ onLogin, onToggle }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateLoginForm = () => {
    let valid = true;
    const newErrors = {};

    if (!loginData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    if (validateLoginForm()) {
      try {
        const response = await axios.post('http://localhost:8000/login', loginData);
        console.log('Login successful:', response.data);
        setSuccessMessage('Login successful');
        setErrorMessage('');
        onLogin(response.data.user);
      } catch (error) {
        console.error('Login failed:', error.response.data);
        setSuccessMessage('');
        if (error.response.status === 401) {
          setErrorMessage('Credentials not matched. Please check your email and password.');
        } else if (error.response.status === 400) {
          setErrorMessage('Please enter both email and password.');
        } else {
          setErrorMessage(`An error ${error} occurred while logging in. Please try again later.`);
        }
      }
      
    }
  };
  

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <div className="main">
        <form onSubmit={handleLoginSubmit}>
          <div className="inp1">
            <label>
              Email:
              <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} />
            </label>
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <br />
          <div className="inp2">
            <label>
              Password:
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} />
            </label>
          </div>
          
          {errors.password && <p className="error-message">{errors.password}</p>}
          <br />
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="foot"><button type="submit">Login</button></div>
        </form>
      </div>
      <p>
        New user?{' '}
        <span className="toggle-link" onClick={() => onToggle('register')}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
