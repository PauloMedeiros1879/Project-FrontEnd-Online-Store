import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import { getProductById } from '../../services/api';

class ProductPage extends React.Component {
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
    return (
      <div>
        <Product
          id={ id }
          title={ title }
          price={ price }
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

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductPage;
