import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Product from '../../Components/Product/Product';
import { getProductById } from '../../services/api';

class ProductDetails extends React.Component {
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
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  };

  render() {
    const { product } = this.state;
    const { title, price, thumbnail, id } = product;
    const { addToCart } = this.props;
    return (
      <div>
        <Product
          title={ title }
          price={ price }
          addToCart={ addToCart }
          id={ id }
          thumbnail={ thumbnail }
          datatest="product-detail-name"
        />
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho De Compras
        </Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
