import React, { useState } from 'react';
import './AuthForms.css'; 
import axios from 'axios'; 
import Alert from './Alert'; 

const Register = ({ onToggle, onRegistrationSuccess }) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const validateRegisterForm = () => {
    let valid = true;
    const newErrors = {};

    if (!registerData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!registerData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!registerData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (validateRegisterForm()) {
      try {
        const response = await axios.post('http://3.27.110.181:8000/register', registerData);
        console.log('Registration successful:', response.data);
        onRegistrationSuccess();
      } catch (error) {
        console.error('Registration failed:', error.response.data);
        setErrorMessage('Registration failed. Please try again.'); 
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {errorMessage && <Alert message={errorMessage} />} {/* Display alert if error message exists */}
      <form onSubmit={handleRegisterSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={registerData.username} onChange={handleRegisterChange} />
        </label>
        {errors.username && <p className="error-message">{errors.username}</p>}
        <br />
        <label>
          Email:
          <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <br />
        <label>
          Password:
          <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
          />
        </label>
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <span className="toggle-link" onClick={() => onToggle('login')}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
