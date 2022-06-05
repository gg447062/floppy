const SET_STAMP = 'SET_STAMP';
const SET_TEMPLATE = 'SET_TEMPLATE';
const SET_OVERLAY = 'SET_OVERLAY';
const SET_LAYER = 'SET_LAYER';
const SET_SIZE = 'SET_SIZE';
const SET_COLOR = 'SET_COLOR';
const SET_FONT_COLOR = 'SET_FONT_COLOR';
const SET_FONT_SIZE = 'SET_FONT_SIZE';
const SET_FILTER = 'SET_FILTER';
const SET_ARTIST_FONT = 'SET_ARTIST_FONT';
const SET_TRACK_FONT = 'SET_TRACK_FONT';
const SET_BG = 'SET_BG';
const SET_CENTERLABEL = 'SET_CENTERLABEL';
const SET_FG = 'SET_FG';

export const setStamp = (stamp) => ({
  type: SET_STAMP,
  stamp,
});

export const setTemplate = (template) => ({
  type: SET_TEMPLATE,
  template,
});

export const setOverlay = (overlay) => ({
  type: SET_OVERLAY,
  overlay,
});

export const setLayer = (layer) => ({
  type: SET_LAYER,
  layer,
});

export const setSize = (size) => ({
  type: SET_SIZE,
  size,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter,
});

export const setColor = (color) => ({
  type: SET_COLOR,
  color,
});

export const setFontColor = (color) => ({
  type: SET_FONT_COLOR,
  color,
});

export const setFontSize = (size) => ({
  type: SET_FONT_SIZE,
  size,
});

export const setArtistFont = (font) => ({
  type: SET_ARTIST_FONT,
  font,
});

export const setTrackFont = (font) => ({
  type: SET_TRACK_FONT,
  font,
});

export const setBg = (bg, bgTexture) => ({
  type: SET_BG,
  bg,
  bgTexture,
});

export const setCenterLabel = (cl, clTexture) => ({
  type: SET_CENTERLABEL,
  cl,
  clTexture,
});

export const setFg = (fg) => ({
  type: SET_FG,
  fg,
});

const initState = {
  stamp: null,
  template: null,
  overlay: null,
  // layer: 'template',
  layer: 'center-label',
  size: 1,
  filter: null,
  color: '#000000',
  fontColor: '#000000',
  fontSize: 20,
  artistFont: { class: 'ff-0' },
  trackFont: { class: 'ff-0' },
  bg: {},
  bgTexture: {},
  cl: {},
  clTexture: {},
  fg: {},
};

const editorReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STAMP:
      return { ...state, stamp: action.stamp };
    case SET_TEMPLATE:
      return { ...state, template: action.template };
    case SET_OVERLAY:
      return { ...state, overlay: action.overlay };
    case SET_LAYER:
      return { ...state, layer: action.layer };
    case SET_SIZE:
      return { ...state, size: action.size };
    case SET_COLOR:
      return { ...state, color: action.color };
    case SET_FONT_COLOR:
      return { ...state, fontColor: action.color };
    case SET_FONT_SIZE:
      return { ...state, fontSize: action.size };
    case SET_ARTIST_FONT:
      return { ...state, artistFont: action.font };
    case SET_TRACK_FONT:
      return { ...state, trackFont: action.font };
    case SET_FILTER:
      return { ...state, filter: action.filter };
    case SET_BG:
      return { ...state, bg: action.bg, bgTexture: action.bgTexture };
    case SET_CENTERLABEL:
      return { ...state, cl: action.cl, clTexture: action.clTexture };
    case SET_FG:
      return { ...state, fg: action.fg };
    default:
      return state;
  }
};

export default editorReducer;
