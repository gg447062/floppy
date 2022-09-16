const SET_SIZE = 'SET_SIZE';
const SET_COLOR = 'SET_COLOR';

export const setColor = (color) => ({
  type: SET_COLOR,
  color,
});

export const setSize = (size) => ({
  type: SET_SIZE,
  size,
});

const initState = {
  color: '#000000',
  size: 0.5,
};

const stampsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return { ...state, color: action.color };
    case SET_SIZE:
      return { ...state, size: action.size };
    default:
      return state;
  }
};

export default stampsReducer;
