import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer';
import documentReducer from './reducers/documentReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  document: documentReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
