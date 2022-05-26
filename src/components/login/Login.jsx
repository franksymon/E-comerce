import React, { useState } from 'react';
//import axios from 'axios';
import './login.css';
import { useDispatch } from 'react-redux';
import { loginThunK } from '../../redux/actions';

const Login = ({
  isLoginOpen, //Esta prop vinen del components Navbar - button login
  setLoginOpen, // Estado viene components Navbar
}) => {
  const reset = () => {
    setEmail('');
    setPassword('');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');

  const dispacht = useDispatch();

  const login = e => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };
    dispacht(loginThunK(credentials))
      .then(res => {
        localStorage.setItem('token', res.data.data.token);
        setLoginError('');
        setLoginOpen(false);
      })
      .catch(error => {
        setLoginError(error.response.data.message);
      });

    reset();
  };

  const name = localStorage.getItem('user');
  console.log(name);

  return (
    <>
      <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''}`}>
        {localStorage.getItem('token') ? (
          <>
            <div className="avatar-login">
              <i className="fa-solid fa-circle-user"></i>
            </div>
            <button
              className="btn-login"
              onClick={() => localStorage.setItem('token', '')}
              type="button"
            >
              Log out
              <p>{name}</p>
            </button>
          </>
        ) : (
          <>
            <div className="avatar-login">
              <i className="fa-solid fa-circle-user"></i>
            </div>
            <div className="test-data">
              <h5>Test data</h5>
              <p>
                <i className="fa-solid fa-envelope"></i> max@gmail.com
              </p>
              <p>
                <i className="fa-solid fa-lock"></i> john1234
              </p>
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {<p>{loginError}</p>}
            <button className="btn-login">Submit</button>
            <p>
              Don't have an account? <span>Sign up</span>
            </p>
          </>
        )}
      </form>
    </>
  );
};

export default Login;
