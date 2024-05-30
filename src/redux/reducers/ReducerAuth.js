import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_BAD_EMAIL,
  SET_BAD_PASSWORD,
} from '../ActionTypes';

const initialState = {
  email: '',
  password: '',
  badEmail: false,
  badPassword: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL:
      return {...state, email: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    case SET_BAD_EMAIL:
      return {...state, badEmail: action.payload};
    case SET_BAD_PASSWORD:
      return {...state, badPassword: action.payload};
    default:
      return state;
  }
}
