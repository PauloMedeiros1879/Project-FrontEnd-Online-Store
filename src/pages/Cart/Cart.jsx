import React, { Component } from 'react';
import { ReactComponent as EmptyCartSVG } from '../../images/empty-cart.svg';
import { ReactComponent as CartSVG } from '../../images/cart.svg';
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
      <div className="cart_products_div">
        {cartProducts.map(({ id, title, price, quantity, thumbnail }) => (
          <CartProduct
            key={ id }
            id={ id }
            title={ title }
            price={ price }
            quantity={ quantity }
            thumbnail={ thumbnail }
          />
        ))}
      </div>
    );
  };

  render() {
    const { cartProducts } = this.state;
    return (
      <section className="cart_page">
        <div className="cart_div">
          <CartSVG className="btn_cart " />
          <span> Carrinho de Compras</span>
        </div>
        {cartProducts.length === 0 && this.renderEmptyCartElement()}
        {this.renderCartProducts()}
      </section>
    );
  }
}

export default Cart;
