const SET_SIZE = 'SET_SIZE';
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

export const setSize = (size) => ({
  type: SET_SIZE,
  size,
});

const initState = {
  filter: null,
  color: '#000000',
  size: 0.5,
};

const stampsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return { ...state, color: action.color };
    case SET_FILTER:
      return { ...state, filter: action.filter };
    case SET_SIZE:
      return { ...state, size: action.size };
    default:
      return state;
  }
};

export default stampsReducer;
