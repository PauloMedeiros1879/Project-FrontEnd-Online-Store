import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';

class CategoriesList extends Component {
  renderCategories = () => {
    const { categories, searchByCategories } = this.props;

    if (categories.length === 0) return <Loading />;

    return categories.map(({ id, name }) => (
      <button
        data-testid="category"
        type="button"
        key={ id }
        className="categorie_item"
        onClick={ () => searchByCategories(id) }
      >
        {name}
      </button>
    ));
  };

  render() {
    return <>{this.renderCategories()}</>;
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchByCategories: PropTypes.func.isRequired,
};

export default CategoriesList;
