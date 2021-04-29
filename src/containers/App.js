import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import Measure from './Measure';
import Admin from './Admin';
import Login from './Login';
import query from '../query';
import '../assets/css/App.scss';
import { setMeasures } from '../actions';

const App = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.token) {
      query('GET', 'measurements', null, (result) => {
        if (result.measures && result.measurements) {
          dispatch(setMeasures(result));
        } else {
          setErrorMessage(result.error);
        }
      });
    }
  });

  return (
    <div>
      {localStorage.token
        ? (
          <Router>
            <div className="error row main-center cross-center">{errorMessage}</div>
            <header className="row main-space-around">
              <Link to="/" className="col cross-center main-center shadow-5 link flex">
                <FontAwesomeIcon icon={faHome}>Sign Out</FontAwesomeIcon>
                <span>Home</span>
              </Link>
              <button type="button" onClick={logout} className="link col cross-center main-center flex">
                <FontAwesomeIcon icon={faSignOutAlt}>Sign Out</FontAwesomeIcon>
                <span>Log out</span>
              </button>
            </header>
            <div className="main">
              <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/measure/:id"><Measure /></Route>
                <Route path="/admin"><Admin /></Route>
              </Switch>
            </div>
          </Router>
        )
        : <Login />}
    </div>
  );
};

export default App;
