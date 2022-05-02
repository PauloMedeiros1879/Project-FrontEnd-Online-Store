import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyCartSVG } from '../../images/empty-cart.svg';
import { ReactComponent as CartSVG } from '../../images/cart.svg';
import { ReactComponent as HomeSVG } from '../../images/home.svg';
import { getCartFromStorage } from '../../services/cartManager';
import CartProduct from '../../Components/CartProduct';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: getCartFromStorage(),
    };
  }

  renderEmptyCartElement = () => (
    <div className="empty_cart_div">
      <EmptyCartSVG className="empty_cart_img" />
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</p>
    </div>
  );

  renderCartProducts = () => {
    const { cartProducts } = this.state;
    if (!cartProducts) return null;

    return (
      <section className="cart_products_section">
        {cartProducts.map(({ id, title, price, quantity, thumbnail }) => (
          <CartProduct
            key={ id }
            id={ id }
            title={ title }
            price={ price }
            quantity={ quantity }
            thumbnail={ thumbnail }
            updateCart={ this.updateCart }
          />
        ))}
      </section>
    );
  };

  updateCart = () => {
    this.setState({ cartProducts: getCartFromStorage() });
  };

  render() {
    const { cartProducts } = this.state;
    const total = cartProducts.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0,
    );

    const totalProducts = getCartFromStorage().reduce(
      (acc, { quantity }) => quantity + acc,
      0,
    );

    return (
      <section className="cart_page">
        <header className="cart_header">
          <Link to="/cart">
            <CartSVG className="btn_cart " />
          </Link>
          <span className="total_cart">{totalProducts}</span>
          <Link to="/" className="link_home">
            <HomeSVG className="cart_img_products_details" />
          </Link>
        </header>
        {cartProducts.length === 0 && this.renderEmptyCartElement()}
        {this.renderCartProducts()}
        {cartProducts.length > 0 && (
          <div className="cart_finish_purchase">
            <p className="cart_total">
              <span>Total:</span>
              {' '}
              {`R$${total.toFixed(2)}`}
            </p>
            <Link
              to="/checkout"
              data-testid="checkout-products"
              className="link_checkout"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </section>
    );
  }
}

export default Cart;
