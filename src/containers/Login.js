import React, { useState } from 'react';
import getRequest from '../constants';
import '../assets/css/Login.scss';

const Login = () => {
  const [signin, setSignin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const login = (e) => {
    e.preventDefault();
    fetch(getRequest('POST', 'users/login', {
      name: e.target.name.value,
      password: e.target.password.value,
    }))
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((response) => {
        if (response.token) {
          localStorage.token = response.token;
          window.location.reload();
        }
      })
      .catch(() => {
        setErrorMessage("Couldn't Sign In!");
      });
  };
  const signup = (e) => {
    e.preventDefault();
    fetch(getRequest('POST', 'users/create', {
      name: e.target.name.value,
      password: e.target.password.value,
    }))
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((response) => {
        if (response.token) {
          localStorage.token = response.token;
          window.location.reload();
        }
      })
      .catch(() => {
        setErrorMessage("Couldn't Sign Up!");
      });
  };
  return (
    <div className="login">
      {signin
        ? (
          <div className="col cross-center main-center">
            <form onSubmit={login} className="col cross-center">
              <h2>Sign In</h2>
              <input type="text" name="name" placeholder="Username" />
              <input type="password" name="password" placeholder="Password" />
              <input type="submit" value="Sign In" className="link w-90" />
              <button type="button" onClick={() => { setSignin(false); }} className="link button w-90">or create new account</button>
            </form>
          </div>
        )
        : (
          <div className="col cross-center main-center">
            <form onSubmit={signup} className="col cross-center">
              <h2>Create new account</h2>
              <input type="text" name="name" placeholder="Username" />
              <input type="password" name="password" placeholder="Password" />
              <input type="submit" value="Sign Up" className="link w-90" />
              <button type="button" onClick={() => { setSignin(true); }} className="link button w-90">Go to Sign In page</button>
            </form>
          </div>
        )}
      <div className="error row main-center cross-center">{errorMessage}</div>
    </div>
  );
};

export default Login;
