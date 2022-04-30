import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveProductToCart } from '../../services/cartManager';

class Product extends Component {
  renderProductDetailBtn = () => {
    const { id } = this.props;

    return (
      <Link
        to={ `/product/${id}` }
        className="product_detail_link"
        data-testid="product-detail-link"
      >
        Detalhes do produto
      </Link>
    );
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
      <div className="product_card" data-testid="product">
        <h2 className="product_title">{title}</h2>
        <img className="product_img" src={ thumbnail } alt={ title } />
        <p className="product_price">{price ? `Preço: R$${price.toFixed(2)}` : ''}</p>
        {this.renderProductDetailBtn()}
        <button
          type="button"
          data-testid="product-add-to-cart"
          className="btn_add_to_cart"
          onClick={ this.addProductToCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string,
};

Product.defaultProps = {
  id: null,
};

export default Product;
