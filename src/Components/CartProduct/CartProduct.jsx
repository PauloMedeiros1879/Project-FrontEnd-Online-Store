import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateItemQuantityInCart, removeItemFromCart } from '../../services/cartManager';

class CartProduct extends Component {
  constructor(props) {
    super(props);
    const { quantity } = props;
    this.state = {
      quantity,
    };
  }

  increaseQuantity = () => {
    this.setState(
      ({ quantity }) => ({
        quantity: quantity + 1,
      }),
      () => this.updateScreen(),
    );
  };

  decreaseQuantity = () => {
    this.setState(
      ({ quantity }) => ({
        quantity: quantity >= 1 ? quantity - 1 : 0,
      }),
      () => this.updateScreen(),
    );
  };

  updateScreen = () => {
    const { updateCart } = this.props;
    this.updateQuantityInStorage();
    updateCart();
  };

  updateQuantityInStorage = () => {
    const { id } = this.props;
    const { quantity } = this.state;
    updateItemQuantityInCart(id, quantity);
  };

  removeItem = () => {
    const { id, updateCart } = this.props;
    removeItemFromCart(id);
    updateCart();
  };

  render() {
    const { title, price, thumbnail } = this.props;
    const { quantity } = this.state;
    return (
      <div className="cart_product_item">
        <button type="button" className="cart_btn" onClick={ this.removeItem }>
          X
        </button>
        <img className="cart_product_img" src={ thumbnail } alt={ title } />
        <span className="cart_product_name" data-testid="shopping-cart-product-name">
          {title}
        </span>
        <button
          type="button"
          className="cart_btn"
          onClick={ this.increaseQuantity }
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <span
          className="cart_product_quantity"
          data-testid="shopping-cart-product-quantity"
        >
          {quantity}
        </span>
        <button
          type="button"
          className="cart_btn"
          onClick={ this.decreaseQuantity }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <span>
          R$
          {price.toFixed(2)}
        </span>
      </div>
    );
  }
}

CartProduct.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default CartProduct;
