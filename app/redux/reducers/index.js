import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documentReducer from './documentReducer';

export default combineReducers({
  auth: authReducer,
  document: documentReducer,
});
