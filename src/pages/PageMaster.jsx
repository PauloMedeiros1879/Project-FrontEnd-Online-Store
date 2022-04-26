import React, { Component } from 'react';

class PageMaster extends Component {
  render() {
    return (
      <div>
        <label htmlFor="seach" data-testid="home-initial-message">
          <input
            type="text"
            name="seach"
            id="seach"
          />
          Digite algum termo de pesquisa ou escolha uma categoria.
        </label>
      </div>
    );
  }
}

export default PageMaster;
