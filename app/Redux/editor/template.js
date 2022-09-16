const SET_COLOR = 'SET_COLOR';

export const setColor = (color) => ({
  type: SET_COLOR,
  color,
});

const initState = {
  color: '#000000',
};

const templateReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return { ...state, color: action.color };
    default:
      return state;
  }
};

export default templateReducer;
