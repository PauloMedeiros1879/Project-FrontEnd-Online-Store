const getProductsFromStorage = () => {
  const products = JSON.parse(localStorage.getItem('cartItems'));
  return products || [];
};

const saveProductToStorage = (id) => {
  const cart = getProductsFromStorage();
  const hasItem = cart.some(({ id: currentId }) => currentId === id);

  if (hasItem) {
    cart.find(({ id: currentId }) => currentId === id).quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  localStorage.setItem('cartItems', JSON.stringify(cart));
};

export { saveProductToStorage, getProductsFromStorage };
