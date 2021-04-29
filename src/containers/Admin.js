import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import query from '../query';
import List from '../components/List';
import { addMeasure } from '../actions';

const Admin = () => {
  const [redirect, setRedirect] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const measures = useSelector((state) => state.measures);
  const createMeasure = (e) => {
    e.preventDefault();
    const measure = {
      item: e.target.item.value,
      unit: e.target.unit.value,
    };
    query('POST', 'measures', measure, (result) => {
      if (result.id) {
        measure.id = result.id;
        e.target.item.value = '';
        e.target.unit.value = '';
        dispatch(addMeasure(measure));
      } else {
        setErrorMessage(result.error);
      }
    });
  };
  useEffect(() => {
    if (localStorage.token) {
      query('GET', 'admins', null, (result) => {
        if (result.admin) {
          setRedirect(false);
        } else {
          setRedirect(true);
        }
      });
    }
  });

  return (
    <div>
      {redirect
        ? <Redirect to="/" />
        : (
          <div>
            {redirect === null
              ? <div />
              : (
                <div>
                  <List list={measures} itemKey="item" displayAttr={['item', 'unit']} toAddAttr={['item', 'unit']} addItem={createMeasure} />
                  <div className="error row main-center cross-center">{errorMessage}</div>
                </div>
              )}
          </div>
        )}
    </div>
  );
};

export default Admin;
