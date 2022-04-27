import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { title, thumbnail, price, datatest } = this.props;
    // console.log(id);
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
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  datatest: PropTypes.string,
};

export default Product;
