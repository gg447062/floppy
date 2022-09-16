const SET_STAMP_SIZE = 'SET_STAMP_SIZE';
const SET_STAMP_COLOR = 'SET_STAMP_COLOR';
const SET_STAMP_FILTER = 'SET_STAMP_FILTER';
const SET_ARTIST_FONT = 'SET_ARTIST_FONT';
const SET_ARTIST_FONT_COLOR = 'SET_ARTIST_FONT_COLOR';
const SET_ARTIST_FONT_SIZE = 'SET_ARTIST_FONT_SIZE';
const SET_TRACK_FONT = 'SET_TRACK_FONT';
const SET_TRACK_FONT_COLOR = 'SET_TRACK_FONT_COLOR';
const SET_TRACK_FONT_SIZE = 'SET_TRACK_FONT_SIZE';

export const setStampSize = (size) => ({
  type: SET_STAMP_SIZE,
  size,
});

export const setStampFilter = (filter) => ({
  type: SET_STAMP_FILTER,
  filter,
});

export const setStampColor = (color) => ({
  type: SET_STAMP_COLOR,
  color,
});

export const setArtistFont = (font) => ({
  type: SET_ARTIST_FONT,
  font,
});

export const setArtistFontColor = (color) => ({
  type: SET_ARTIST_FONT_COLOR,
  color,
});

export const setArtistFontSize = (size) => ({
  type: SET_ARTIST_FONT_SIZE,
  size,
});

export const setTrackFont = (font) => ({
  type: SET_TRACK_FONT,
  font,
});

export const setTrackFontColor = (color) => ({
  type: SET_TRACK_FONT_COLOR,
  color,
});

export const setTrackFontSize = (size) => ({
  type: SET_TRACK_FONT_SIZE,
  size,
});

const initState = {
  stampSize: 0.5,
  stampFilter: null,
  stampColor: '#000000',
  artistFont: { class: 'ff-0', name: 'AddCityboy' },
  artistFontColor: '#000000',
  artistFontSize: 20,
  trackFont: { class: 'ff-0', name: 'AddCityboy' },
  trackFontColor: '#000000',
  trackFontSize: 20,
};

const centerLabelReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STAMP_SIZE:
      return { ...state, stampSize: action.size };
    case SET_STAMP_COLOR:
      return { ...state, stampColor: action.color };
    case SET_STAMP_FILTER:
      return { ...state, stampFilter: action.filter };
    case SET_ARTIST_FONT:
      return { ...state, artistFont: action.font };
    case SET_ARTIST_FONT_COLOR:
      return { ...state, artistFontColor: action.color };
    case SET_ARTIST_FONT_SIZE:
      return { ...state, artistFontSize: action.size };
    case SET_TRACK_FONT:
      return { ...state, trackFont: action.font };
    case SET_TRACK_FONT_COLOR:
      return { ...state, trackFontColor: action.color };
    case SET_TRACK_FONT_SIZE:
      return { ...state, trackFontSize: action.size };
    default:
      return state;
  }
};

export default centerLabelReducer;
