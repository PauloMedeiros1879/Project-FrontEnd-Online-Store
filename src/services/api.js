export async function getCategories() {
  try {
    const api = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = await api.json();
    console.log(categories);
    return categories;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const api = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const catAndQuery = await api.json();
    return catAndQuery;
  } catch (error) {
    console.log(error);
  }
}
