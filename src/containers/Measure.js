import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import getRequest from '../constants';
import List from '../components/List';
import { addMeasurement } from '../actions';

const PetDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [measure, setMeasure] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const measurements = useSelector((state) => state.measurements);
  const selectMeasure = () => {
    for (let i = 0; i < measurements.length; i += 1) {
      if (measurements[i].id === parseInt(id, 10)) {
        setMeasure(measurements[i]);
        break;
      }
    }
  };
  const createMeasurement = (e) => {
    e.preventDefault();
    let measurement = {
      amount: e.target.amount.value,
      measure_id: measure.id,
    };
    fetch(getRequest('POST', 'measurements/create', measurement))
      .then((response) => {
        setErrorMessage('');
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((response) => {
        if (response.measurement) {
          measurement = response.measurement;
          e.target.amount.value = '';
          dispatch(addMeasurement(measure.id, measurement));
          window.location.reload();
        }
      })
      .catch(() => {
        setErrorMessage("Couldn't add Measurement!");
      });
  };
  useEffect(() => {
    selectMeasure();
  });
  return (
    <>
      <div className="row cross-center main-center">
        <div className="w-100 h-100">
          <List list={measure.list} itemKey="created_at" displayAttr={['date', 'amount']} toAddAttr={['amount']} unit={measure.unit} addItem={createMeasurement} />
          <div className="error row main-center cross-center">{errorMessage}</div>
        </div>
      </div>
    </>
  );
};

export default PetDetail;
