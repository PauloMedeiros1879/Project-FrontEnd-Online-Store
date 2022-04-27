import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { title, thumbnail, price, datatest } = this.props;
    return (
      <div>
        {datatest ? <h2 data-testid={ datatest }>{title}</h2> : <h2>{title}</h2>}
        <img src={ thumbnail } alt={ title } />
        <p>{price}</p>
      </div>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  datatest: PropTypes.string,
};

Product.defaultProps = {
  datatest: '',
  title: undefined,
  thumbnail: undefined,
  price: undefined,
};

export default Product;
