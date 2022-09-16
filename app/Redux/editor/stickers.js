const SET_SIZE = 'SET_SIZE';

export const setSize = (size) => ({
  type: SET_SIZE,
  size,
});

const initState = {
  size: 0.5,
};

const stickersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SIZE:
      return { ...state, size: action.size };
    default:
      return state;
  }
};

export default stickersReducer;
