const getProductsFromCart = () => {
  const cart = localStorage.getItem('cart');
  return cart || [];
};

const saveProductsToCart = (product) => {
  const cart = getProductsFromCart();
  const newCart = [...cart, product];
  localStorage.setItem('cart', JSON.stringify(newCart));
};

export { getProductsFromCart, saveProductsToCart };
