import {SET_TIMEOUT_FINISHED} from '../actions/Actions';

const initialState = {
  timeoutFinished: false,
};

const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMEOUT_FINISHED:
      return {
        ...state,
        timeoutFinished: true,
      };
    default:
      return state;
  }
};

export default splashReducer;
