import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Link } from 'react-router-dom';
import '../assets/css/HomeMeasurement.scss';

const HomeMeasurement = ({ measure }) => {
  const { measurements } = measure;

  return (
    <Router>
      <Link to={`/measure/${measure.id}`} className="measure link bg-cover col cross-center main-center">
        {measurements && measurements.length
          ? (
            <div>
              <div className="amount">{`${measurements[measurements.length - 1].amount} ${measure.unit}`}</div>
              {measurements[measurements.length - 2]
                ? (
                  <div className="row main-center dif" style={{ color: measurements[measurements.length - 1].amount > measurements[measurements.length - 2].amount ? 'green' : 'red' }}>
                    {measurements[measurements.length - 1].amount
                    > measurements[measurements.length - 2].amount ? '+' : ''}
                    {(measurements[measurements.length - 1].amount
                    - measurements[measurements.length - 2].amount).toFixed(2)}
                  </div>
                )
                : <div />}
            </div>
          )
          : <div className="amount new">Add new</div>}
        <div className="type">{measure.item}</div>
      </Link>
    </Router>
  );
};

HomeMeasurement.defaultProps = {
  measure: {},
};

HomeMeasurement.propTypes = {
  measure: PropTypes.instanceOf(Object),
};

export default HomeMeasurement;
