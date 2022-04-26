import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <label htmlFor="seach" data-testid="home-initial-message">
          <input type="text" name="seach" id="seach" />
          Digite algum termo de pesquisa ou escolha uma categoria.
        </label>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho De Compras
        </Link>
      </div>
    );
  }
}

export default Home;
