
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../styles/AdminLogin.module.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

       
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_role', data.role);
        localStorage.setItem('admin_email', data.email);
        localStorage.setItem('admin_fullName', data.fullName);

       
        if (data.role === 'admin') {
          navigate('/admin-panel');
        } else {
          setError('Доступ запрещён. Требуется роль администратора.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Ошибка входа');
      }
    } catch (err) {
      console.error('Ошибка при входе администратора:', err);
      setError('Ошибка сети');
    }
  };

  return (
    <div className={s.loginPage}>
      <div className={s.loginBox}>
        <h2 className={s.title}>Вход в админ-панель</h2>
        {error && <div className={s.error}>{error}</div>}
        <form onSubmit={handleLogin} className={s.form}>
          <input
            type="email"
            placeholder="Email администратора"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={s.input}
          />
          <input
            type="password"
            placeholder="Пароль администратора"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={s.input}
          />
          <button type="submit" className={s.button}>Войти как админ</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;