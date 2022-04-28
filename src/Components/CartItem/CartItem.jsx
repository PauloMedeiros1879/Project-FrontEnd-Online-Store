import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../../services/api';

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      product: '',
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { id } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  };

  render() {
    const { product } = this.state;
    const { quantity } = this.props;
    return (
      <div>
        <h2 data-testid="shopping-cart-product-name">{product.title}</h2>
        <p data-testid="shopping-cart-product-quantity">{quantity}</p>
      </div>
    );
  }
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartItem;
