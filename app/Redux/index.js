import { combineReducers } from 'redux';
import editorReducer from './editor';

const appReducer = combineReducers({
  editor: editorReducer,
});

export default appReducer;
