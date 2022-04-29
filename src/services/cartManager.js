const getCartFromStorage = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart || [];
};

const verifyProductInCart = (product) => {
  const oldCart = getCartFromStorage();
  return oldCart.some(({ id }) => id === product.id);
};

const saveProductToCart = (product) => {
  const oldCart = getCartFromStorage();
  let newCart;
  if (!verifyProductInCart(product)) {
    product.quantity = 1;
    newCart = [...oldCart, product];
  } else {
    oldCart.find(({ id }) => id === product.id).quantity += 1;
    newCart = oldCart;
  }
  localStorage.setItem('cart', JSON.stringify(newCart));
};

const updateItemQuantityInCart = (id, quantity) => {
  const newCart = getCartFromStorage();
  newCart.find(({ id: productId }) => productId === id).quantity = quantity;
  localStorage.setItem('cart', JSON.stringify(newCart));
};

export { getCartFromStorage, saveProductToCart, updateItemQuantityInCart };
