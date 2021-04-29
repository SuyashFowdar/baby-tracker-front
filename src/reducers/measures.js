import _ from 'lodash';

const castMeasurement = (measure, measurement) => {
  const date = new Date(measurement.created_at);
  const msmnt = measurement;
  msmnt.date = date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
  measure.measurements.push(msmnt);
};

const measuresReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEASURES':
      for (let j = 0; j < action.result.measures.length; j += 1) {
        const measure = action.result.measures[j];
        measure.measurements = [];
        for (let i = 0; i < action.result.measurements.length; i += 1) {
          const measurement = action.result.measurements[i];
          if (measurement.measure_id === measure.id) {
            castMeasurement(measure, measurement);
          }
        }
      }
      return action.result.measures;
    case 'ADD_MEASURE':
      return [...state, action.measure];
    case 'ADD_MEASUREMENT': {
      const measures = _.cloneDeep(state);
      for (let i = 0; i < measures.length; i += 1) {
        if (measures[i].id === action.measurement.measure_id) {
          castMeasurement(measures[i], action.measurement);
        }
      }
      return measures;
    }
    default:
      return state;
  }
};

export default measuresReducer;
