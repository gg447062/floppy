const SET_FILTER = 'SET_FILTER';

export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter,
});

const initState = {
  filter: null,
};

const templateReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};

export default templateReducer;
