/* eslint-disable no-unused-vars */
const key = "ReStore"
const keyCart = "ReStore_Cart"

export const getValue = () => {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (err) {
    return null;
  }
}

export const setValue = (newValue) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  } catch (err) {}
};

export const getCartValue = () => {
  try {
    const value = window.localStorage.getItem(keyCart);
    if (value) {
      return JSON.parse(value);
    }
  } catch (err) {
    return null;
  }
}

export const addcartValue = (newValue) => {
  const value = window.localStorage.getItem(keyCart);
  let cart = [];
  if (value) {
    cart = JSON.parse(value);
  }
  try {
    cart.push(newValue)
    window.localStorage.setItem(keyCart, JSON.stringify(cart));
  } catch (err) {
  }
};


export const removeCartValue = (id) => {
  const value = window.localStorage.getItem(keyCart);
  let cart = [];
  let newCart = [];
  if (value) {
    cart = JSON.parse(value);
    // eslint-disable-next-line array-callback-return
    cart.map((c) => {
      if (c.id !== id) {
        newCart.push(c)
      }
    })
  } else {
    return;
  }
  try {
    window.localStorage.setItem(keyCart, JSON.stringify(newCart));
  } catch (err) {
  }
};

export const clearCart = () => {
  try {
    window.localStorage.setItem(keyCart, JSON.stringify([]));
  } catch (err) {
  }
};