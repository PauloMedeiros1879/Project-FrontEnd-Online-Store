import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveProductToStorage } from '../../services/cartControl';

class Product extends Component {
  addItemToCart = () => {
    const { id } = this.props;
    console.log(id);
    saveProductToStorage(id);
  };

  renderButton = () => {
    const { whoCalls } = this.props;

    return (
      <button
        type="button"
        data-testid={
          whoCalls === 'HomePage'
            ? 'product-add-to-cart'
            : 'product-detail-add-to-cart'
        }
        onClick={ this.addItemToCart }
      >
        Adicionar ao Carrinho
      </button>
    );
  };

  render() {
    const { title, thumbnail, price, datatest } = this.props;
    return (
      <div>
        {datatest ? <h2 data-testid={ datatest }>{title}</h2> : <h2>{title}</h2>}
        <img src={ thumbnail } alt={ title } />
        <p>{price}</p>
        {this.renderButton()}
      </div>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  datatest: PropTypes.string,
  id: PropTypes.string,
  whoCalls: PropTypes.string.isRequired,
};

Product.defaultProps = {
  datatest: '',
  title: undefined,
  thumbnail: undefined,
  price: undefined,
  id: undefined,
};

export default Product;
