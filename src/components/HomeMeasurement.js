import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Link } from 'react-router-dom';
import '../assets/css/HomeMeasurement.scss';

const HomeMeasurement = ({ measurement }) => (
  <Router>
    <Link to={`/measure/${measurement.id}`} className="measurement link bg-cover col cross-center main-center">
      {measurement.list && measurement.list.length
        ? (
          <div>
            <div className="amount">{`${measurement.list[measurement.list.length - 1].amount} ${measurement.unit}`}</div>
            {measurement.list[measurement.list.length - 2]
              ? (
                <div className="row main-center dif" style={{ color: measurement.list[measurement.list.length - 1].amount > measurement.list[measurement.list.length - 2].amount ? 'green' : 'red' }}>
                  {measurement.list[measurement.list.length - 1].amount
                  > measurement.list[measurement.list.length - 2].amount ? '+' : ''}
                  {(measurement.list[measurement.list.length - 1].amount
                  - measurement.list[measurement.list.length - 2].amount).toFixed(2)}
                </div>
              )
              : <div />}
          </div>
        )
        : <div className="amount new">Add new</div>}
      <div className="type">{measurement.item}</div>
    </Link>
  </Router>
);

HomeMeasurement.defaultProps = {
  measurement: {},
};

HomeMeasurement.propTypes = {
  measurement: PropTypes.instanceOf(Object),
};

export default HomeMeasurement;
