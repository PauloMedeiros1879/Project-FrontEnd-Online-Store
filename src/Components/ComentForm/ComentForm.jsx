import React, { Component } from 'react';
import PropTYpes from 'prop-types';
import { ReactComponent as StarSVG } from '../../images/star.svg';
import { ReactComponent as StarColoredSVG } from '../../images/star_colored.svg';

class ComentForm extends Component {
  renderStars = () => {
    const starsNumber = 5;
    const stars = new Array(starsNumber).fill(undefined);
    const { rating, updateRating } = this.props;
    return stars.map((star, index) => {
      const starIndex = index + 1;
      return (
        <label key={ index } htmlFor={ index }>
          {starIndex <= rating ? (
            <StarColoredSVG className="star" />
          ) : (
            <StarSVG className="star" />
          )}
          <input
            type="checkbox"
            data-testid={ `${starIndex}-rating` }
            id={ index }
            checked={ starIndex <= rating }
            className="rating_input"
            onChange={ () => updateRating(starIndex) }
          />
        </label>
      );
    });
  };

  render() {
    const {
      email,
      evaluation,
      handleInputChange,
      submitEvaluation,
      isRatingButtonEnabled,
    } = this.props;

    return (
      <form className="evaluation_form">
        <fieldset>
          <legend> Faça uma Avaliação</legend>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="product-detail-email"
            onChange={ handleInputChange }
            placeholder="Email"
          />
          <textarea
            data-testid="product-detail-evaluation"
            name="evaluation"
            value={ evaluation }
            placeholder="Digite um Comentario"
            onChange={ handleInputChange }
            rows="6"
            style={ { resize: 'none' } }
          />
          <div className="rating_div">{this.renderStars()}</div>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ submitEvaluation }
            disabled={ isRatingButtonEnabled }
            className="disabled"
          >
            Avaliar
          </button>
        </fieldset>
      </form>
    );
  }
}

ComentForm.propTypes = {
  rating: PropTYpes.number.isRequired,
  updateRating: PropTYpes.func.isRequired,
  email: PropTYpes.string.isRequired,
  evaluation: PropTYpes.string.isRequired,
  handleInputChange: PropTYpes.func.isRequired,
  submitEvaluation: PropTYpes.func.isRequired,
  isRatingButtonEnabled: PropTYpes.bool.isRequired,
};

export default ComentForm;
