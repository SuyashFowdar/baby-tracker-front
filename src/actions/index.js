export const setMeasures = (result) => ({
  type: 'SET_MEASURES',
  result,
});

export const addMeasure = (measure) => ({
  type: 'ADD_MEASURE',
  measure,
});

export const addMeasurement = (measurement) => ({
  type: 'ADD_MEASUREMENT',
  measurement,
});

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  token,
});
