import React, { useState, useEffect } from 'react';
import s from '../../styles/Reviews.module.css';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { fetchReviews as apiFetchReviews, createReview as apiCreateReview } from '../../services/reviewApi';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const data = await apiFetchReviews(); 
      setReviews(data);
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error);
      alert('Не удалось загрузить отзывы');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      const newReview = await apiCreateReview(reviewData); 
      setReviews([newReview, ...reviews]);
      alert('Отзыв успешно отправлен!');
    } catch (error) {
      console.error('Ошибка отправки отзыва:', error);
      alert(`Ошибка: ${error.message}`);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div className={s.reviewsPage}>
      <h1 className={s.title}>Отзывы</h1>
      <ReviewForm onSubmit={handleAddReview} />
      {loading ? (
        <div className={s.loading}>Загрузка отзывов...</div>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </div>
  );
};

export default ReviewsPage;