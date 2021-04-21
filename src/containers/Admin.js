import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getRequest from '../constants';
import List from '../components/List';
import { addMeasure } from '../actions';

const Admin = () => {
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const measures = useSelector((state) => state.measurements);
  const createMeasure = (e) => {
    e.preventDefault();
    const measure = {
      item: e.target.item.value,
      unit: e.target.unit.value,
    };
    fetch(getRequest('POST', 'measures/create', measure))
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((response) => {
        if (response.id) {
          measure.id = response.id;
          e.target.item.value = '';
          e.target.unit.value = '';
          dispatch(addMeasure(measure));
        }
      })
      .catch(() => {
        setErrorMessage("Couldn't add new Measure!");
      });
  };
  useEffect(() => {
    if (localStorage.token) {
      fetch(getRequest('GET', 'users/admin'))
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((response) => {
          if (!response.admin) {
            setRedirect(true);
          }
        })
        .catch(() => {
          setRedirect(true);
        });
    }
  });

  return (
    <div>
      {redirect
        ? <Redirect to="/" />
        : (
          <div>
            <List list={measures} itemKey="item" displayAttr={['item', 'unit']} toAddAttr={['item', 'unit']} addItem={createMeasure} />
            <div className="error row main-center cross-center">{errorMessage}</div>
          </div>
        )}
    </div>
  );
};

export default Admin;
