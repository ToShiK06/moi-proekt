import React from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();

  // Проверяем, вошёл ли пользователь
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Страница записи</h2>
      <p>Здесь будет форма записи.</p>
      <button onClick={() => navigate('/')}>Вернуться на главную</button>
    </div>
  );
};

export default Booking;