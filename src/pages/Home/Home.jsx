import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getCategories,
  getProductsFromQuery,
  getProductsFromCategory,
} from '../../services/api';
import './Home.css';
import Product from '../../Components/Product';
import Loading from '../../Components/Loading';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      querySearch: '',
      products: [],
      searchMade: false,
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
    this.setState({ products: productsObj, searchMade: true });
  };

  handleInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSearchClick = () => {
    this.fetchProducts();
  };

  searchByCategory = async ({ target }) => {
    const { id } = target;
    const productsObj = await getProductsFromCategory(id);
    this.setState({ products: productsObj, searchMade: true });
  };

  renderProducts = () => {
    const { products } = this.state;
    const { addToCart } = this.props;
    if (!products) return <Loading />;

    if (products.length === 0) return <p>Nenhum Produto foi Encontrado</p>;

<<<<<<< HEAD:src/pages/Home/Home.jsx
    return products.map((product) => (
      <div key={ product.id } data-testid="product">
        <Product
          id={ product.id }
          title={ product.title }
          price={ product.price }
          thumbnail={ product.thumbnail }
          addToCart={ addToCart }
          homeCall="home"
        />
        <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
=======
    return products.map(({ id, title, price, thumbnail }) => (
      <div key={ id } data-testid="product">
        <Product
          id={ id }
          title={ title }
          price={ price }
          thumbnail={ thumbnail }
          whoCalls="HomePage"
        />
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
>>>>>>> ccc22ca2cee4199220ca6eb1bcac97d83bbf1b90:src/pages/HomePage/HomePage.jsx
          Ver detalhes do produto
        </Link>
      </div>
    ));
  };

  renderCategories = () => {
    const { categories } = this.state;
    if (!categories) return <Loading />;

    return categories.map(({ name, id }, i) => (
      <li key={ i }>
        <button
          id={ id }
          data-testid="category"
          type="button"
          className="btn_categories"
          onClick={ this.searchByCategory }
        >
          {name}
        </button>
      </li>
    ));
  };

  render() {
    const { querySearch, searchMade, cartProducts } = this.state;
    return (
      <section className="home_section">
        <header className="home_header">
          {!searchMade && (
            <h2 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>
          )}
          <input
            onChange={ this.handleInputChange }
            type="text"
            name="querySearch"
            id="querySearch"
            value={ querySearch }
            data-testid="query-input"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleSearchClick }
          >
            Pesquisar
          </button>
          <Link
            to={ {
              pathname: '/shopping-cart',
              state: { cartProducts },
            } }
            data-testid="shopping-cart-button"
          >
            Carrinho De Compras
          </Link>
        </header>
        <ul className="categories">{this.renderCategories()}</ul>
        <section className="products_section">
          {searchMade && this.renderProducts()}
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Home;
