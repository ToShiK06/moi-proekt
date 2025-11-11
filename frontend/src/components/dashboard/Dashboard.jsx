import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: localStorage.getItem('email') || 'Пользователь',
    phone: localStorage.getItem('phone') || 'Не указан',
    fullName: localStorage.getItem('fullName') || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newFullName, setNewFullName] = useState(userData.fullName);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  console.log('Телефон из localStorage:', localStorage.getItem('phone'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('fullName');
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setNewFullName(userData.fullName);
  };

  const handleSaveClick = () => {
    setUserData({ ...userData, fullName: newFullName });
    localStorage.setItem('fullName', newFullName);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewFullName(userData.fullName);
    setIsEditing(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>👤 Личный кабинет</h1>
        <p>Добро пожаловать, <strong>{userData.email}</strong>!</p>
      </div>

      <div className="dashboard-content">
        <h2>📋 Личная информация</h2>
        <ul className="info-list">
          <li>
            <span className="info-label">✉️ Email:</span>
            <span className="info-value">{userData.email}</span>
          </li>
          <li>
            <span className="info-label">📱 Телефон:</span>
            <span className="info-value">{userData.phone}</span>
          </li>
          <li>
            <span className="info-label">👨‍💼 ФИО:</span>
            <span className="info-value">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    className="edit-input"
                    placeholder="Введите ФИО"
                  />
                  <button onClick={handleSaveClick} className="edit-btn save-btn">✅ Сохранить</button>
                  <button onClick={handleCancelClick} className="edit-btn cancel-btn">❌ Отмена</button>
                </>
              ) : (
                <>
                  {userData.fullName || 'Не указано'}
                  <button onClick={handleEditClick} className="edit-btn">✏️ Изменить</button>
                </>
              )}
            </span>
          </li>
        </ul>

        <div className="dashboard-buttons">
          <button onClick={handleGoHome} className="action-btn home-btn">
            🏠 Вернуться на главную
          </button>
          <button onClick={handleLogout} className="action-btn logout-btn">
            🔐 Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;