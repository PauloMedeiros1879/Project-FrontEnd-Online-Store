import React, { Component } from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  renderProducts = () => {
    const { cart, addToCart, decreaseQuantity } = this.props;
    if (cart.length > 0) {
      return cart.map(({ title, quantity, thumbnail, id }) => (
        <div key={ title }>
          <p data-testid="shopping-cart-product-name">{title}</p>
          <p data-testid="shopping-cart-product-quantity">{quantity}</p>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ () => addToCart({ title, thumbnail, id, quantity }) }
          >
            +
          </button>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ () => decreaseQuantity(id) }
          >
            -
          </button>
        </div>
      ));
    }

=======
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
>>>>>>> ccc22ca2cee4199220ca6eb1bcac97d83bbf1b90
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
  };

  render() {
    return <>{this.renderProducts()}</>;
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default ShoppingCart;
