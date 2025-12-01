import React, { useState } from 'react';
import s from '../../styles/Reviews.module.css';

const ReviewForm = ({ onSubmit }) => {
  const [user_name, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user_name && rating && comment) {
      onSubmit({ user_name, rating, comment });
      setUserName('');
      setRating(0);
      setComment('');
    }
  };

  return (
    <form className={s.formContainer} onSubmit={handleSubmit}>
      <h2 className={s.formTitle}>Оставить отзыв</h2>
      <div className={s.formGroup}>
        <label className={s.label}>Ваше имя</label>
        <input
          type="text"
          className={s.input}
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className={s.formGroup}>
        <label className={s.label}>Рейтинг</label>
        <div className={s.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`${s.star} ${star <= rating ? s.active : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className={s.formGroup}>
        <label className={s.label}>Комментарий</label>
        <textarea
          className={s.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={s.submitButton}>
        Отправить отзыв
      </button>
    </form>
  );
};

export default ReviewForm;