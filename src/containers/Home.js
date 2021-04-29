import React from 'react';
import { useSelector } from 'react-redux';
import HomeMeasurement from '../components/HomeMeasurement';
import '../assets/css/Home.scss';

const Home = () => {
  const measures = useSelector((state) => state.measures);

  return (
    <>
      <div className="row wrap">
        {measures.map((measure) => (
          <HomeMeasurement key={measure.id} measure={measure} />
        ))}
      </div>
    </>
  );
};

export default Home;
