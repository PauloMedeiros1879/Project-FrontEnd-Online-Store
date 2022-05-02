const getRatings = () => {
  const rating = localStorage.getItem('productRatings');
  return rating ? JSON.parse(rating) : [];
};

const saveProductRating = (id, rating, email, evaluation) => {
  let newRatings = getRatings();
  newRatings = [...newRatings, { id, rating, evaluation, email }];
  localStorage.setItem('productRatings', JSON.stringify(newRatings));
};

export { getRatings, saveProductRating };
