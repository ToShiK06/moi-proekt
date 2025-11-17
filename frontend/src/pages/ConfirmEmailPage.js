// src/pages/ConfirmEmailPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (!token) {
      setError('Токен отсутствует');
      return;
    }

    const confirmEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/auth/confirm-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setError(data.message || 'Ошибка подтверждения');
        }
      } catch (err) {
        setError('Ошибка сети');
      }
    };

    confirmEmail();
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      {error && (
        <div style={{
          padding: '20px',
          backgroundColor: '#ffcccc',
          border: '1px solid #ff9999',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <h2>❌ Ошибка</h2>
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div style={{
          padding: '20px',
          backgroundColor: '#ccffcc',
          border: '1px solid #99ff99',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <h2>✅ Успех!</h2>
          <p>{message}</p>
          <p>Через 3 секунды вы будете перенаправлены на главную страницу...</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmailPage;