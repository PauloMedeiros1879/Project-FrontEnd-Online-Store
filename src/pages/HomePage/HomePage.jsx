import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromQuery } from '../../services/api';
import Product from '../Product';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      querySearch: '',
      products: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categoriesObj = await getCategories();
    this.setState({
      categories: categoriesObj,
    });
  };

  fetchProducts = async () => {
    const { querySearch } = this.state;
    const productsObj = await getProductsFromQuery(querySearch);
    console.log(productsObj);
    this.setState({
      products: productsObj,
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    this.fetchProducts();
  };

  renderProducts = () => {
    const { products } = this.state;
    return products.map(({ id, title, price, thumbnail }) => (
      <div key={ id } data-testid="product">
        <Product id={ id } title={ title } price={ price } thumbnail={ thumbnail } />
      </div>
    ));
  };

  render() {
    const { categories, querySearch, products } = this.state;
    return (
      <div>
        <label htmlFor="querySearch" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input
            onChange={ this.handleChange }
            type="text"
            name="querySearch"
            id="querySearch"
            value={ querySearch }
            data-testid="query-input"
          />
        </label>
        <button type="button" data-testid="query-button" onClick={ this.handleClick }>
          Pesquisar
        </button>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho De Compras
        </Link>
        <ul className="categories">
          {categories.map(({ name }, i) => (
            <li key={ i } data-testid="category">
              {name}
            </li>
          ))}
        </ul>
        {products.length > 0 ? (
          this.renderProducts()
        ) : (
          <p>Nenhum Produto foi Encontrado</p>
        )}
      </div>
    );
  }
}

export default HomePage;
