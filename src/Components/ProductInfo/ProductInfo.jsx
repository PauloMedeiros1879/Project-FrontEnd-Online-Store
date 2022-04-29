import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveProductToCart } from '../../services/cartManager';

class ProductInfo extends Component {
  renderAttributes = () => {
    const { attributes } = this.props;
    if (!attributes) return null;

    return attributes.map(({ name, value_name: value }) => (
      <li key={ name } className="product_specifications_item">
        {name}
        :
        {' '}
        {value}
      </li>
    ));
  };

  addProductToCart = () => {
    const { id, title, price, thumbnail } = this.props;
    const productObj = {
      id,
      title,
      price,
      thumbnail,
    };
    saveProductToCart(productObj);
  };

  render() {
    const { thumbnail, title, price } = this.props;
    return (
      <main className="product_details_main">
        <div className="product_details_card">
          <h2 data-testid="product-detail-name">{title}</h2>
          <img src={ thumbnail } alt={ title } />
          <p>{price ? `R$${price.toFixed(2)}` : ''}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            className="btn_add_to_cart"
            onClick={ this.addProductToCart }
          >
            Adicionar ao Carrinho
          </button>
        </div>
        <ul className="product_specifications">
          <h2>Especificações Técnicas</h2>
          {this.renderAttributes()}
        </ul>
      </main>
    );
  }
}

ProductInfo.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  attributes: PropTypes.arrayOf(Object).isRequired,
};

export default ProductInfo;
