async function getCategories() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`,
    );
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFromCategory(CATEGORY_ID) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`,
    );
    const products = await response.json();
    return products.results;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFromQuery(QUERY) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`,
    );
    const products = await response.json();
    return products.results;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(PRODUCT_ID) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/items/${PRODUCT_ID}`,
    );
    const product = await response.json();
    console.log(product);
    return product;
  } catch (error) {
    console.log(error);
  }
}

export {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductsFromQuery,
  getProductsFromCategory,
  getProductById,
};
