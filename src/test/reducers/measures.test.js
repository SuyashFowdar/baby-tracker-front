import measuresReducer from '../../reducers/measures';

describe('an object', () => {
  it('checks for default state', () => {
    const measure = measuresReducer([], { type: 'dummy' });
    expect(measure).toEqual([]);
  });

  it('sets measurements', () => {
    const measure = measuresReducer([], { type: 'SET_MEASURES', result: { measures: [{ item: 'Weight' }, { item: 'Height' }], measurements: [] } });
    expect(measure).toEqual([{ item: 'Weight', measurements: [] }, { item: 'Height', measurements: [] }]);
  });

  it('adds measure', () => {
    const measure = measuresReducer([], {
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
    const measure = measuresReducer([{
      id: 1,
      item: 'weight',
      unit: 'Kg',
      measurements: [],
    }], { type: 'ADD_MEASUREMENT', measurement: { amount: 3, measure_id: 1 } });
    expect(measure).toEqual([{
      id: 1,
      item: 'weight',
      unit: 'Kg',
      measurements: [{ amount: 3, measure_id: 1, date: 'Invalid Date' }],
    }]);
  });
});
