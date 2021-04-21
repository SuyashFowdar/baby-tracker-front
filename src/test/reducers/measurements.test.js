import measurementsReducer from '../../reducers/measurements';

describe('an object', () => {
  it('checks for default state', () => {
    const measure = measurementsReducer([], { type: 'dummy' });
    expect(measure).toEqual([]);
  });

  it('sets measurements', () => {
    const measure = measurementsReducer([], { type: 'SET_MEASUREMENTS', measurements: [{ item: 'Weight' }, { item: 'Height' }] });
    expect(measure).toEqual([{ item: 'Weight' }, { item: 'Height' }]);
  });

  it('adds measure', () => {
    const measure = measurementsReducer([], {
      type: 'ADD_MEASURE',
      measure: {
        id: 1,
        item: 'weight',
        unit: 'Kg',
        list: [],
      },
    });
    expect(measure).toEqual([{
      id: 1,
      item: 'weight',
      unit: 'Kg',
      list: [],
    }]);
  });

  it('adds measurement', () => {
    const measure = measurementsReducer([{
      id: 1,
      item: 'weight',
      unit: 'Kg',
      list: [],
    }], { type: 'ADD_MEASUREMENT', measurement: { amount: 3 }, measureId: 1 });
    expect(measure).toEqual([{
      id: 1,
      item: 'weight',
      unit: 'Kg',
      list: [{ amount: 3 }],
    }]);
  });
});
