import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as StarSVG } from '../../images/star.svg';
import { ReactComponent as StarColoredSVG } from '../../images/star_colored.svg';

class Coments extends Component {
  renderRatings = () => {
    const { productRatings } = this.props;
    if (productRatings.length === 0) {
      return <h2 className="no_ratings">Seja o primeiro a avaliar esse produto!</h2>;
    }

    return productRatings.map(({ evaluation, email, rating }, i) => (
      <div className="rating_card" key={ i }>
        <div className="rating_person_info">
          <p className="person_email">{email}</p>
          <p className="person_rating">{this.renderStars(rating)}</p>
        </div>
        <p className="rating_coment">{evaluation}</p>
      </div>
    ));
  };

  renderStars = (rating) => {
    const starsNumber = 5;
    const stars = new Array(starsNumber).fill(undefined);
    return stars.map((star, index) => {
      const starIndex = index + 1;
      return (
        <span key={ index }>
          {starIndex <= rating ? (
            <StarColoredSVG className="star" />
          ) : (
            <StarSVG className="star" />
          )}
        </span>
      );
    });
  };

  render() {
    return (
      <section className="ratings_section">
        <h1>Avaliações</h1>
        {this.renderRatings()}
      </section>
    );
  }
}

Coments.propTypes = {
  productRatings: PropTypes.arrayOf(
    PropTypes.shape({
      evaluation: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Coments;
