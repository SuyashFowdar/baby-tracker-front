import React from 'react';
import { useSelector } from 'react-redux';
import HomeMeasurement from '../components/HomeMeasurement';
import '../assets/css/Home.scss';

const Home = () => {
  const measurements = useSelector((state) => state.measurements);

  return (
    <>
      <div className="row wrap">
        {measurements.map((measurement) => (
          <HomeMeasurement key={measurement.id} measurement={measurement} />
        ))}
      </div>
    </>
  );
};

export default Home;
