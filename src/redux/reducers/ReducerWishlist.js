import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../ActionTypes';

const reducerWishlist = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return [...state, action.payload];
    case REMOVE_FROM_WISHLIST:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default reducerWishlist;
