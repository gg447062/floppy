const SET_ARTIST = 'SET_ARTIST';
const SET_TRACK = 'SET_TRACK';
const SET_ADDRESS = 'SET_ADDRESS';

export const setArtist = (artist) => ({
  type: SET_ARTIST,
  artist,
});

export const setTrack = (track) => ({
  type: SET_TRACK,
  track,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  address,
});

const initState = { artist: '', track: '', address: null };

const metadataReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ARTIST:
      return { ...state, artist: action.artist };
    case SET_TRACK:
      return { ...state, track: action.track };
    case SET_ADDRESS:
      return { ...state, address: action.address };
    default:
      return state;
  }
};

export default metadataReducer;
