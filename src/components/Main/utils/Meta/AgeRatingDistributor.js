import React from 'react';

const AgeRatingDistributor = ({ ages, props }) => {
  const { esrb, pegi, ratings } = props;
  return ages.map(age => {
    let targetRating = '';
    let ageRatingsImgUrls = {};
    const { category, rating } = age;
    switch (category) {
      case 1:
        targetRating = 'esrb';
        break;
      case 2:
        targetRating = 'pegi';
        break;
      default:
        targetRating = '';
        break;
    }
    switch (targetRating) {
      case 'esrb':
        ageRatingsImgUrls = esrb;
        break;
      case 'pegi':
        ageRatingsImgUrls = pegi;
        break;
      default:
        ageRatingsImgUrls = {};
        break;
    }
    return (
      <img
        key={`${targetRating}-${ratings[rating]}`}
        src={`${ageRatingsImgUrls[rating]}`}
        alt={`${targetRating}-${ratings[rating]}`}
      />
    );
  });
};

export default AgeRatingDistributor;