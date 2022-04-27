import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <>
        <h2>{title}</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{price}</p>
      </>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
