import React, { useState } from 'react';
import query from '../query';
import '../assets/css/Login.scss';

const Login = () => {
  const [signin, setSignin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const performRequest = (e, url) => {
    e.preventDefault();
    query('POST', url, {
      name: e.target.name.value,
      password: e.target.password.value,
    }, (result) => {
      if (result.token) {
        localStorage.token = result.token;
        window.location.reload();
      } else {
        setErrorMessage(result.error);
      }
    });
  };
  return (
    <div className="login">
      <div>
        {signin
          ? (
            <div className="col cross-center main-center">
              <form onSubmit={(e) => { performRequest(e, 'sessions'); }} className="col cross-center">
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
              <form onSubmit={(e) => { performRequest(e, 'users'); }} className="col cross-center">
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
    </div>
  );
};

export default Login;
