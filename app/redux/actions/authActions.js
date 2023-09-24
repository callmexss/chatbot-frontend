// authActions.js

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
