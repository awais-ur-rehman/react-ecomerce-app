import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_NAV,
  SET_TIMEOUT_FINISHED,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  SET_EMAIL,
  SET_PASSWORD,
  SET_BAD_EMAIL,
  SET_BAD_PASSWORD,
  SET_NAME,
  SET_CONFIRM_PASSWORD,
  SET_MOBILE,
  SET_BAD_NAME,
  SET_BAD_CONFIRM_PASSWORD,
  SET_BAD_MOBILE,
  SET_PREVIOUS_PASSWORD,
  SET_BAD_PREVIOUS_PASSWORD,
  SET_PHONE,
  SET_BAD_PHONE,
} from '../ActionTypes';

export const addItemToCart = data => ({
  type: ADD_TO_CART,
  payload: data,
});

export const addToWishlist = data => ({
  type: ADD_TO_WISHLIST,
  payload: data,
});

export const removeFromWishlist = id => ({
  type: REMOVE_FROM_WISHLIST,
  payload: id,
});

export const setNav = navIndex => ({
  type: SET_NAV,
  payload: navIndex,
});

export const setTimeoutFinished = () => ({
  type: SET_TIMEOUT_FINISHED,
});

export const updateCartQuantity = (id, quantity) => ({
  type: UPDATE_CART_QUANTITY,
  payload: {id, quantity},
});

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const setName = name => ({type: SET_NAME, payload: name});
export const setEmail = email => ({type: SET_EMAIL, payload: email});
export const setPassword = password => ({
  type: SET_PASSWORD,
  payload: password,
});
export const setConfirmPassword = confirmPassword => ({
  type: SET_CONFIRM_PASSWORD,
  payload: confirmPassword,
});
export const setMobile = mobile => ({type: SET_MOBILE, payload: mobile});
export const setBadName = isBad => ({type: SET_BAD_NAME, payload: isBad});
export const setBadEmail = isBad => ({type: SET_BAD_EMAIL, payload: isBad});
export const setBadPassword = isBad => ({
  type: SET_BAD_PASSWORD,
  payload: isBad,
});
export const setBadConfirmPassword = isBad => ({
  type: SET_BAD_CONFIRM_PASSWORD,
  payload: isBad,
});
export const setBadMobile = isBad => ({type: SET_BAD_MOBILE, payload: isBad});
export const setPreviousPassword = previousPassword => ({
  type: SET_PREVIOUS_PASSWORD,
  payload: previousPassword,
});
export const setBadPreviousPassword = isBad => ({
  type: SET_BAD_PREVIOUS_PASSWORD,
  payload: isBad,
});
export const setPhone = phone => ({type: SET_PHONE, payload: phone});
export const setBadPhone = isBad => ({type: SET_BAD_PHONE, payload: isBad});
