import React from 'react';
import s from '../../styles/Reviews.module.css';

const ReviewList = ({ reviews }) => {
  return (
    <div className={s.listContainer}>
      {reviews.map((review) => (
        <div key={review.id} className={s.review}>
          <div className={s.reviewHeader}>
            <span className={s.reviewAuthor}>{review.user_name}</span>
            <div className={s.reviewRating}>
              {'★'.repeat(review.rating)}
            </div>
          </div>
          <p className={s.reviewText}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;