import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setForm({ username: '', email: '', password: '' });
    setErrors({});
  };

  const validate = () => {
    let formErrors = {};
    if (!form.username) formErrors.username = 'Username is required';
    if (isSignUp && !form.email) formErrors.email = 'Email is required';
    if (!form.password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      if (isSignUp) {
        // Handle sign up
        const newUsers = [...users, form];
        setUsers(newUsers);
        localStorage.setItem('users', JSON.stringify(newUsers));
        alert('Sign up successful! You can now log in.');
        toggleForm();
      } else {
        // Handle login
        const user = users.find(user => user.username === form.username && user.password === form.password);
        if (user) {
          navigate('/dashboard');
        } else {
          setErrors({ form: 'Invalid username or password' });
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        {isSignUp && (
          <div>
            <label>Email</label>
            <input
              type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
      )}
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      {errors.form && <p className="error">{errors.form}</p>}
      <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
    </form>
    <p onClick={toggleForm} className="toggle-form">
      {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
    </p>
  </div>
  );
};

export default Auth;
