import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from '../ActionTypes';

const reducerCart = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id,
      );
      if (existingItemIndex >= 0) {
        return state.map(item =>
          item.id === action.payload.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      } else {
        return [...state, {...action.payload, quantity: 1}];
      }

    case UPDATE_CART_QUANTITY:
      return state.map(item =>
        item.id === action.payload.id
          ? {...item, quantity: action.payload.quantity}
          : item,
      );

    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
};

export default reducerCart;
