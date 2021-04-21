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
import getRequest from '../constants';
import '../assets/css/App.scss';
import { setMeasurements } from '../actions';

const App = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (localStorage.token) {
      fetch(getRequest('GET', 'measurements/fetch'))
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((response) => {
          if (response.measures && response.measurements) {
            for (let j = 0; j < response.measures.length; j += 1) {
              const measure = response.measures[j];
              measure.list = [];
              for (let i = 0; i < response.measurements.length; i += 1) {
                const measurement = response.measurements[i];
                const date = new Date(measurement.created_at);
                measurement.date = date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
                if (measurement.measure_id === measure.id) measure.list.push(measurement);
              }
            }
          }
          dispatch(setMeasurements(response.measures));
        })
        .catch(() => {
          setErrorMessage("Couldn't fetch Measurements!");
        });
    }
  });

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

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
