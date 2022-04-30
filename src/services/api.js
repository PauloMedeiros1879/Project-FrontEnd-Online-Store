async function getCategories() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  try {
    if (!QUERY) {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`,
      );
      const products = await response.json();
      return products;
    }

    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`,
    );
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(PRODUCT_ID) {
  try {
    const response = await fetch(` https://api.mercadolibre.com/items/${PRODUCT_ID}`);
    const product = response.json();
    return product;
  } catch (error) {
    console.log(error);
  }
}

export { getProductsFromCategoryAndQuery, getCategories, getProductById };
