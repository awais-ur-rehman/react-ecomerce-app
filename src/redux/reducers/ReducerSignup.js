import {
  SET_NAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_CONFIRM_PASSWORD,
  SET_MOBILE,
  SET_BAD_NAME,
  SET_BAD_EMAIL,
  SET_BAD_PASSWORD,
  SET_BAD_CONFIRM_PASSWORD,
  SET_BAD_MOBILE,
} from '../ActionTypes';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  badName: false,
  badEmail: false,
  badPassword: false,
  badConfirmPassword: false,
  badMobile: false,
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return {...state, name: action.payload};
    case SET_EMAIL:
      return {...state, email: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    case SET_CONFIRM_PASSWORD:
      return {...state, confirmPassword: action.payload};
    case SET_MOBILE:
      return {...state, mobile: action.payload};
    case SET_BAD_NAME:
      return {...state, badName: action.payload};
    case SET_BAD_EMAIL:
      return {...state, badEmail: action.payload};
    case SET_BAD_PASSWORD:
      return {...state, badPassword: action.payload};
    case SET_BAD_CONFIRM_PASSWORD:
      return {...state, badConfirmPassword: action.payload};
    case SET_BAD_MOBILE:
      return {...state, badMobile: action.payload};
    default:
      return state;
  }
}
