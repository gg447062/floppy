import { combineReducers } from 'redux';
import editorReducer from './editor';
import metadataReducer from './metadata';

const appReducer = combineReducers({
  editor: editorReducer,
  metadata: metadataReducer,
});

export default appReducer;
