import {createStore, combineReducers} from 'redux';
import reducerCart from '../reducers/ReducerCart';
import reducerWishlist from '../reducers/ReducerWishlist';
import splashReducer from '../reducers/ReducerSplash';
import authReducer from '../reducers/ReducerAuth';
import signupReducer from '../reducers/ReducerSignup';
import profileReducer from '../reducers/ReducerProfile';

const initialState = {
  selectedNav: 0,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAV':
      return {
        ...state,
        selectedNav: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  splash: splashReducer,
  nav: navReducer,
  cart: reducerCart,
  wishlist: reducerWishlist,
  auth: authReducer,
  signup: signupReducer,
  profile: profileReducer,
});

const store = createStore(rootReducer);

export default store;
