import {
  SET_NAME,
  SET_PHONE,
  SET_PASSWORD,
  SET_PREVIOUS_PASSWORD,
  SET_BAD_NAME,
  SET_BAD_PHONE,
  SET_BAD_PASSWORD,
  SET_BAD_PREVIOUS_PASSWORD,
} from '../ActionTypes';

const initialState = {
  name: '',
  phone: '',
  password: '',
  previousPassword: '',
  badName: false,
  badPhone: false,
  badPassword: false,
  badPreviousPassword: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {...state, name: action.payload};
    case SET_PHONE:
      return {...state, phone: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    case SET_PREVIOUS_PASSWORD:
      return {...state, previousPassword: action.payload};
    case SET_BAD_NAME:
      return {...state, badName: action.payload};
    case SET_BAD_PHONE:
      return {...state, badPhone: action.payload};
    case SET_BAD_PASSWORD:
      return {...state, badPassword: action.payload};
    case SET_BAD_PREVIOUS_PASSWORD:
      return {...state, badPreviousPassword: action.payload};
    default:
      return state;
  }
};

export default profileReducer;
