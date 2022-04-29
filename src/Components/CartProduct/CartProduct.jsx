import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateItemQuantityInCart } from '../../services/cartManager';

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
      () => this.updateQuantityInStorage(),
    );
  };

  decreaseQuantity = () => {
    this.setState(
      ({ quantity }) => ({
        quantity: quantity - 1,
      }),
      () => this.updateQuantityInStorage(),
    );
  };

  updateQuantityInStorage = () => {
    const { id } = this.props;
    const { quantity } = this.state;
    updateItemQuantityInCart(id, quantity);
  };

  render() {
    const { title, price, thumbnail } = this.props;
    const { quantity } = this.state;
    return (
      <div className="cart_product_item">
        <img src={ thumbnail } alt={ title } />
        <span data-testid="shopping-cart-product-name">{title}</span>
        <span data-testid="shopping-cart-product-quantity">
          Quantidade :
          {' '}
          {quantity}
        </span>
        <span>{price}</span>
        <button
          type="button"
          onClick={ this.increaseQuantity }
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <button
          type="button"
          onClick={ this.decreaseQuantity }
          data-testid="product-decrease-quantity"
        >
          +
        </button>
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
};

export default CartProduct;
