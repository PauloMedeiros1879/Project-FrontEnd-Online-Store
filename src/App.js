import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/HomePage';
import ShoppingCart from './pages/ShoppingCart';
import ProductPage from './pages/ProductPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductPage
              { ...props }
            />) }
          />
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
