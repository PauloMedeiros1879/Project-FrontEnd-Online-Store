/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CartSVG } from '../../images/cart.svg';
import { ReactComponent as HomeSVG } from '../../images/home.svg';
import { ReactComponent as VisaSVG } from '../../images/visa.svg';
import { ReactComponent as MastercardSVG } from '../../images/mastercard.svg';
import { ReactComponent as BankCardSVG } from '../../images/bank-card.svg';
import { getCartFromStorage } from '../../services/cartManager';
import CheckoutForm from '../../Components/CheckoutForm';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: getCartFromStorage(),
      name: '',
      cpf: '',
      email: '',
      address: '',
      city: '',
      state: '',
      cep: '',
      phone: '',
      number: '',
      payment: '',
    };
  }

  renderProducts = () => {
    const { cartProducts } = this.state;
    const total = cartProducts.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0,
    );

    return (
      <section className="checkout_products_section">
        <h2>Revise Seus Produtos</h2>
        {cartProducts.map(({ id, title, price, quantity, thumbnail }) => (
          <div className="checkout_product_item" key={ id }>
            <img src={ thumbnail } alt={ title } />
            <span className="checkout_product_name">{title}</span>
            <span className="checkout_product_quantity">
              Quantidade:
              {' '}
              {quantity}
            </span>
            <span>
              R$
              {price.toFixed(2)}
            </span>
          </div>
        ))}
        <p className="checkout_total">
          <span>Total:</span>
          {' '}
          {`R$${total.toFixed(2)}`}
        </p>
      </section>
    );
  };

  handleChange = ({ target }) => {
    const { name, value, id, type } = target;
    this.setState({ [name]: type === 'radio' ? id : value });
  };

  render() {
    const { name, email, address, city, state, cep, phone, cpf, number, payment } = this.state;

    const totalProducts = getCartFromStorage().reduce(
      (total, { quantity }) => quantity + total,
      0,
    );

    return (
      <section className="checkout_page">
        <header className="checkout_header">
          <Link to="/cart">
            <CartSVG className="btn_cart " />
          </Link>
          <span className="total_cart">{totalProducts}</span>
          <Link to="/" className="link_home">
            <HomeSVG className="cart_img_products_details" />
          </Link>
        </header>
        {this.renderProducts()}
        <section className="buyer_info_section">
          <CheckoutForm
            name={ name }
            email={ email }
            address={ address }
            city={ city }
            state={ state }
            cep={ cep }
            phone={ phone }
            cpf={ cpf }
            number={ number }
            handleChange={ this.handleChange }
          />
        </section>
        <section className="pay_method_section">
          <h2>Método de Pagamento</h2>
          <div className="pay_method_item">
            <h3>Boleto</h3>
            <label htmlFor="bankCard">
              <input
                onChange={ this.handleChange }
                type="radio"
                name="payment"
                id="bankCard"
                value={ payment === 'bankCard' }
              />
              <BankCardSVG className="pay_method_img" />
            </label>
          </div>
          <div className="pay_method_item">
            <h3>Cartão de Crédito</h3>
            <label htmlFor="visa">
              <input
                value={ payment === 'visa' }
                onChange={ this.handleChange }
                type="radio"
                name="payment"
                id="visa"
              />
              Visa
              <VisaSVG className="pay_method_img" />
            </label>
            <label htmlFor="mastercard">
              <input
                onChange={ this.handleChange }
                type="radio"
                name="payment"
                id="mastercard"
                value={ payment === 'mastercard' }
              />
              Mastercard
              <MastercardSVG className="pay_method_img" />
            </label>
          </div>
        </section>
        <button type="button">Finalizar Compra</button>
      </section>
    );
  }
}

export default Checkout;
