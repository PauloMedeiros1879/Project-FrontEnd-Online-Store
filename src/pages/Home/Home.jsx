/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CartSVG } from '../../images/cart.svg';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import { getCartFromStorage } from '../../services/cartManager';
import CategoriesList from '../../Components/CategoriesList';
import Product from '../../Components/Product';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searchMade: false,
      searchQuery: '',
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  handleInputChange = ({ target }) => {
    this.setState({ searchQuery: target.value });
  };

  searchProducts = async () => {
    const { searchQuery } = this.state;
    this.removeHighlight();
    const products = await getProductsFromCategoryAndQuery('', searchQuery);
    this.setState({ products: products.results, searchMade: true });
  };

  highlightCategoryClicked = (id) => {
    const { categories } = this.state;
    const categoryName = categories.find(({ id: categoryId }) => categoryId === id).name;
    const categoriesElements = Array.from(document.querySelectorAll('.categorie_item'));

    categoriesElements.forEach((category) => {
      const { textContent } = category;
      if (textContent === categoryName) category.classList.add('active');
      else category.classList.remove('active');
    });
  };

  removeHighlight = () => {
    const categoriesElements = Array.from(document.querySelectorAll('.categorie_item'));
    categoriesElements.forEach((category) => category.classList.remove('active'));
  };

  searchByCategories = async (id) => {
    this.highlightCategoryClicked(id);
    const products = await getProductsFromCategoryAndQuery(id, '');
    this.setState({ products: products.results, searchMade: true });
  };

  renderProducts = () => {
    const { products } = this.state;

    return products.map(({ id, thumbnail, title, price }) => (
      <Product
        key={ id }
        id={ id }
        thumbnail={ thumbnail }
        title={ title }
        price={ price }
        updateScreen={ this.updateScreen }
      />
    ));
  };

  updateScreen = () => {
    this.forceUpdate();
  };

  render() {
    const { categories, searchMade, products } = this.state;

    const totalProducts = getCartFromStorage().reduce(
      (total, { quantity }) => quantity + total,
      0,
    );

    return (
      <section className="home_page">
        <header className="home_search_div">
          <div>
            <input
              data-testid="query-input"
              type="text"
              name="searchQuery"
              placeholder="Procure um item"
              onChange={ this.handleInputChange }
            />
            <button
              data-testid="query-button"
              type="button"
              className="btn_search"
              onClick={ this.searchProducts }
            >
              Pesquisar
            </button>
            <Link to="/cart" data-testid="shopping-cart-button" className="link_cart">
              <CartSVG className="cart_img" />
            </Link>
            <span data-testid="shopping-cart-size" className="total_cart">
              {totalProducts}
            </span>
          </div>
          {!searchMade && (
            <h2 data-testid="home-initial-message" className="home_initial_message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>
          )}
        </header>
        <div className="categories_div">
          <h2 className="categories_title">Categorias:</h2>
          <div className="categories_list">
            <CategoriesList
              categories={ categories }
              searchByCategories={ this.searchByCategories }
            />
          </div>
        </div>
        <div className="products_div">
          {searchMade && products.length === 0 && (
            <p className="no_products_message">Nenhum produto foi encontrado</p>
          )}
          {products.length > 0 && this.renderProducts()}
        </div>
      </section>
    );
  }
}

export default Home;
