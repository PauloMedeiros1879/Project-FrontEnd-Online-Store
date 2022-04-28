import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { title, thumbnail, price, datatest, addToCart, id, homeCall } = this.props;
    return (
      <div>
        {datatest ? <h2 data-testid={ datatest }>{title}</h2> : <h2>{title}</h2>}
        <img src={ thumbnail } alt={ title } />
        <p>{price}</p>
        <button
          type="button"
          data-testid={
            homeCall === 'home' ? 'product-add-to-cart' : 'product-detail-add-to-cart'
          }
          onClick={ () => addToCart({ title, thumbnail, price, id, quantity: 1 }) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  datatest: PropTypes.string,
  addToCart: PropTypes.func.isRequired,
  id: PropTypes.string,
  homeCall: PropTypes.string,
};

Product.defaultProps = {
  datatest: undefined,
  homeCall: undefined,
  title: undefined,
  thumbnail: undefined,
  price: undefined,
  id: undefined,
};

export default Product;
