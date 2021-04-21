export const setMeasurements = (measurements) => ({
  type: 'SET_MEASUREMENTS',
  measurements,
});

export const addMeasure = (measure) => ({
  type: 'ADD_MEASURE',
  measure,
});

export const addMeasurement = (measureId, measurement) => ({
  type: 'ADD_MEASUREMENT',
  measureId,
  measurement,
});
