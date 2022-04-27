async function getCategories() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`,
    );
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFromQuery(query) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${query}`,
    );
    const products = await response.json();
    return products.results;
  } catch (error) {
    console.log(error);
  }
}

export { getCategories, getProductsFromCategoryAndQuery, getProductsFromQuery };
