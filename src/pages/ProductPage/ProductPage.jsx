import React from 'react';
import Product from '../Product/Product';
import { getProductById } from '../../services/api';

class ProductPage extends React.Component {
  constructor() {
    super();

    this.state = {
      product: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  }

  render() {
    const { product } = this.state;
    const { title, price, thumbnail } = product;
    return (
      <div>
        <Product title={ title } price={ price } thumbnail={ thumbnail } datatest="product-detail-name" />
      </div>
    );
  }
}

export default ProductPage;
