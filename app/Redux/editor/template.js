const SET_COLOR = 'SET_COLOR';
const SET_FILTER = 'SET_FILTER';

export const setColor = (color) => ({
  type: SET_COLOR,
  color,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter,
});

const initState = {
  filter: null,
  color: '#000000',
};

const templateReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return { ...state, color: action.color };
    case SET_FILTER:
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};

export default templateReducer;
