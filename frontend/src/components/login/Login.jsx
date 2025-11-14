import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.token;

        const userRes = await fetch('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await userRes.json();

        localStorage.setItem('token', token);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('phone', userData.phone || 'Не указан');
        console.log('Сохраняем телефон:', data.phone);
        localStorage.setItem('fullName', userData.fullName || '');

        navigate('/dashboard');
      } else {
        alert(data.error || 'Ошибка входа');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка подключения к серверу');
    }
  };

  return (
    <div className="login-container fade-in">
      <form className="login-form fade-in-delay-1" onSubmit={handleSubmit}>
        <h2 className="fade-in-delay-1">Вход</h2>

        <div className="form-group fade-in-delay-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group fade-in-delay-3">
          <label htmlFor="password">Пароль (минимум 6 символов)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="login-button fade-in-delay-4">Войти</button>

        <p className="register-link fade-in-delay-5" style={{
          display:'flex',
          flexDirection:'column'
        }}>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
          <a href="/">Главная</a>
        </p>
      </form>
    </div>
  );
};

export default Login;