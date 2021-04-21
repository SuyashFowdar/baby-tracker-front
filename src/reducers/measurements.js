const petsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEASUREMENTS':
      return action.measurements;
    case 'ADD_MEASURE':
      return [...state, action.measure];
    case 'ADD_MEASUREMENT':
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].id === action.measureId) {
          state[i].list.push(action.measurement);
        }
      }
      return state;
    default:
      return state;
  }
};

export default petsReducer;
