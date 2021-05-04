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
      action.result.measures.forEach((m) => {
        const measure = m;
        measure.measurements = [];
        action.result.measurements.forEach((measurement) => {
          if (measurement.measure_id === measure.id) {
            castMeasurement(measure, measurement);
          }
        });
      });
      return action.result.measures;
    case 'ADD_MEASURE':
      return [...state, action.measure];
    case 'ADD_MEASUREMENT': {
      const measures = _.cloneDeep(state);
      measures.forEach((measure) => {
        if (measure.id === action.measurement.measure_id) {
          castMeasurement(measure, action.measurement);
        }
      });
      return measures;
    }
    default:
      return state;
  }
};

export default measuresReducer;
