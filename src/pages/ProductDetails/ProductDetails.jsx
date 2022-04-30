import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../../services/api';
import ProductInfo from '../../Components/ProductInfo';
import { ReactComponent as CartSVG } from '../../images/cart.svg';
import { ReactComponent as HomeSVG } from '../../images/home.svg';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: undefined,
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProductById(id);
    this.setState({ product });
  };

  render() {
    const { product } = this.state;
    if (!product) return null;
    const { id, thumbnail, title, price, attributes } = product;
    return (
      <section className="product_details_page">
        <header>
          <Link to="/" className="link_home">
            <HomeSVG className="cart_img_products_details" />
          </Link>
          <Link to="/cart" data-testid="shopping-cart-button" className="link_cart">
            <CartSVG className="cart_img_products_details" />
          </Link>
        </header>
        {product && (
          <ProductInfo
            id={ id }
            thumbnail={ thumbnail }
            title={ title }
            price={ price }
            attributes={ attributes }
          />
        )}
      </section>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
