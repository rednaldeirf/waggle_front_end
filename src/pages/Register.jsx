import React, { useState } from 'react';


const Register = () => {
    // State to hold form input
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  
    // Update form input state
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('User Registered:', formData);
      // You'd normally send this to your backend with fetch or axios
    };
  
    return (
      <div className="register-page">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
  
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
  
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
  
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
  
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default Register;