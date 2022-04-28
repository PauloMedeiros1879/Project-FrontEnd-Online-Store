import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromStorage } from '../../services/cartControl';
import CartItem from '../../Components/CartItem';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const products = getProductsFromStorage();
    this.setState({ products });
  };

  renderProducts = () => {
    const { products } = this.state;
    return products.map(({ id, quantity }) => (
      <CartItem key={ id } id={ id } quantity={ quantity } />
    ));
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        {products.length === 0 ? (
          <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        ) : (
          this.renderProducts()
        )}
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho De Compras
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;
