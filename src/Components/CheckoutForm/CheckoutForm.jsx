/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const states = [
  'Acre',
  'Alagoas',
  'Amapá',
  'Amazonas',
  'Bahia',
  'Ceará',
  'Espirito Santo',
  'Goiás',
  'Maranhão',
  'Mato Grosso',
  'Mato Grosso do Sul',
  'Minas Gerais',
  'Pará',
  'Paraíba',
  'Paraná',
  'Pernanbuco',
  'Piauí',
  'Rio de Janeiro',
  'Rio Grande do Norte',
  'Rio Grande do Sul',
  'Rondônia',
  'Roraima',
  'Santa Catarina',
  'São Paulo',
  'Sergipe',
  'Tocantins',
  'Distrito Federal',
];

class CheckoutForm extends Component {
  renderSelect = () => {
    const { state, handleChange } = this.props;

    return (
      <select name="state" value={ state } onChange={ handleChange }>
        <option value="">Estado</option>
        {states.map((s) => (
          <option key={ s } value={ s }>
            {s}
          </option>
        ))}
      </select>
    );
  };

  render() {
    const { name, cpf, email, address, city, cep, phone, number, handleChange } = this.props;

    return (
      <form className="checkout_form">
        <h1>Informações do Comprador</h1>
        <div className="checkout_form_inputs">
          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
            value={ name }
            data-testid="checkout-fullname"
            onChange={ handleChange }
          />
          <input
            type="text"
            onChange={ handleChange }
            name="cpf"
            data-testid="checkout-cpf"
            placeholder="CPF"
            value={ cpf }
          />
          <input
            type="email"
            onChange={ handleChange }
            name="email"
            data-testid="checkout-email"
            placeholder="email"
            value={ email }
          />
          <input
            type="tel"
            name="phone"
            placeholder="telefone"
            data-testid="checkout-phone"
            pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            onChange={ handleChange }
            value={ phone }
          />
          <input
            onChange={ handleChange }
            type="text"
            name="cep"
            data-testid="checkout-cep"
            placeholder="CEP"
            value={ cep }
          />
          <input
            onChange={ handleChange }
            type="text"
            name="address"
            data-testid="checkout-address"
            placeholder="Endereço"
            value={ address }
          />
          <input
            onChange={ handleChange }
            type="number"
            name="number"
            placeholder="Número"
            value={ number }
          />
          <input
            onChange={ handleChange }
            type="text"
            name="city"
            placeholder="Cidade"
            value={ city }
          />
          {this.renderSelect()}
        </div>
      </form>
    );
  }
}

CheckoutForm.propTypes = {
  name: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CheckoutForm;
