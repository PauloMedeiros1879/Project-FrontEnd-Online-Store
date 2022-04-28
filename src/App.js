import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  addToCart = (product) => {
    const { cart } = this.state;
    const hasProduct = cart.some(({ id }) => id === product.id);
    if (hasProduct) {
      const newCartProducts = [...cart];
      newCartProducts.find(({ id }) => id === product.id).quantity += 1;
      this.setState({ cart: newCartProducts });
    } else {
      const newCartProducts = [...cart, product];
      this.setState({ cart: newCartProducts });
    }
  };

  decreaseQuantity = (id) => {
    const { cart } = this.state;
    const newCartProducts = [...cart];
    const product = newCartProducts.find(({ id: productId }) => productId === id);
    if (product.quantity === 1) {
      const index = newCartProducts.findIndex(({ id: productId }) => productId === id);
      newCartProducts.shift(newCartProducts[index]);
      this.setState({ cart: newCartProducts });
    } else {
      newCartProducts.find(({ id: productId }) => productId === id).quantity -= 1;
      this.setState({ cart: newCartProducts });
    }
  };

  render() {
    const { cart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              addToCart={ this.addToCart }
            />) }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                cart={ cart }
                addToCart={ this.addToCart }
                decreaseQuantity={ this.decreaseQuantity }
              />
            ) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              cart={ cart }
              addToCart={ this.addToCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
