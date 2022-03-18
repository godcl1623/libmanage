import React from 'react';

// props 타입 수정 필요
const AgeRatingDistributor = ({ ages, props }: any) => {
  const { esrb, pegi, ratings } = props;
  // age 타입 수정 필요
  return ages.map((age: any) => {
    let targetRating = '';
    // 타입 확인 필요
    let ageRatingsImgUrls: Record<string, string> = {};
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