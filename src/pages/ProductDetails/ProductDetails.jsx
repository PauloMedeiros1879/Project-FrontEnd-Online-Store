import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { ReactComponent as CartSVG } from '../../images/cart.svg';
import { ReactComponent as HomeSVG } from '../../images/home.svg';
import { getRatings, saveProductRating } from '../../services/ratingsManager';
import ProductInfo from '../../Components/ProductInfo';
import { getCartFromStorage } from '../../services/cartManager';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: undefined,
      rating: 0,
      email: '',
      evaluation: '',
      productRatings: [],
      isRatingButtonEnabled: true,
    };
  }

  componentDidMount() {
    this.fetchProduct();
    this.getRating();
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProductById(id);
    this.setState({ product });
  };

  getRating = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const ratings = getRatings();
    const productRatings = ratings.filter((r) => r.id === id);
    this.setState({ productRatings });
  };

  updateRating = (newRating) => {
    this.setState({ rating: newRating });
  };

  inputHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyRatingForm());
  };

  verifyRatingForm = () => {
    const { email, evaluation } = this.state;
    const button = document.querySelector('fieldset button');
    const errors = [
      !email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
      evaluation.length === 0,
    ];

    const hasErrors = errors.some((error) => error);
    if (!hasErrors) button.classList.remove('disabled');
    else button.classList.add('disabled');

    this.setState({ isRatingButtonEnabled: hasErrors });
  };

  submitEvaluation = () => {
    const { product, rating, email, evaluation } = this.state;
    const { id } = product;
    saveProductRating(id, rating, email, evaluation);
    this.setState({ rating: 0, email: '', evaluation: '' }, () => this.getRating());
  };

  updateScreen = () => {
    this.forceUpdate();
  };

  render() {
    const {
      product, rating, evaluation, email, productRatings, isRatingButtonEnabled,
    } = this.state;

    const totalProducts = getCartFromStorage().reduce(
      (total, { quantity }) => quantity + total,
      0,
    );

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
            <span data-testid="shopping-cart-size" className="total_cart_details">
              {totalProducts}
            </span>
          </Link>
        </header>
        {product && (
          <ProductInfo
            id={ id }
            thumbnail={ thumbnail }
            title={ title }
            price={ price }
            attributes={ attributes }
            rating={ rating }
            updateRating={ this.updateRating }
            handleInputChange={ this.inputHandleChange }
            evaluation={ evaluation }
            email={ email }
            submitEvaluation={ this.submitEvaluation }
            productRatings={ productRatings }
            isRatingButtonEnabled={ isRatingButtonEnabled }
            updateScreen={ this.updateScreen }
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
