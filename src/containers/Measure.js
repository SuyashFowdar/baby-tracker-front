import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import query from '../query';
import List from '../components/List';
import { addMeasurement } from '../actions';

const PetDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [measure, setMeasure] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const measures = useSelector((state) => state.measures);
  const selectMeasure = () => {
    for (let i = 0; i < measures.length; i += 1) {
      if (measures[i].id === parseInt(id, 10)) {
        setMeasure(measures[i]);
        break;
      }
    }
  };
  const createMeasurement = (e) => {
    e.preventDefault();
    query('POST', 'measurements', {
      amount: e.target.amount.value,
      measure_id: measure.id,
    }, (result) => {
      if (result.measurement) {
        e.target.amount.value = '';
        const { measurement } = result;
        measurement.measure_id = measure.id;
        dispatch(addMeasurement(measurement));
      } else {
        setErrorMessage(result.error);
      }
    });
  };
  useEffect(() => {
    selectMeasure();
  });
  return (
    <>
      <div className="row cross-center main-center">
        <div className="w-100 h-100">
          <List list={measure.measurements} itemKey="created_at" displayAttr={['date', 'amount']} toAddAttr={['amount']} unit={measure.unit} addItem={createMeasurement} />
          <div className="error row main-center cross-center">{errorMessage}</div>
        </div>
      </div>
    </>
  );
};

export default PetDetail;
