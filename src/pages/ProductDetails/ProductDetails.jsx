import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
<<<<<<< HEAD:src/pages/ProductDetails/ProductDetails.jsx
import Product from '../../Components/Product/Product';
=======
import Product from '../Product/Product';
>>>>>>> ccc22ca2cee4199220ca6eb1bcac97d83bbf1b90:src/pages/ProductPage/ProductPage.jsx
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
<<<<<<< HEAD:src/pages/ProductDetails/ProductDetails.jsx
    const { addToCart } = this.props;
=======
>>>>>>> ccc22ca2cee4199220ca6eb1bcac97d83bbf1b90:src/pages/ProductPage/ProductPage.jsx
    return (
      <div>
        <Product
          id={ id }
          title={ title }
          price={ price }
          addToCart={ addToCart }
          id={ id }
          thumbnail={ thumbnail }
          datatest="product-detail-name"
          whoCalls="ProductPage"
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
