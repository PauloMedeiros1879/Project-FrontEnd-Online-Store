import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categoriesObj = await getCategories();
    this.setState({
      categories: categoriesObj,
    });
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        <label htmlFor="seach" data-testid="home-initial-message">
          <input type="text" name="seach" id="seach" />
          Digite algum termo de pesquisa ou escolha uma categoria.
        </label>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho De Compras
        </Link>
        <ul className="categories">
          {categories.map(({ name }, i) => (
            <li key={ i } data-testid="category">
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
