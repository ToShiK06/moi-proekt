import React from 'react';
import s from "./Header.module.css";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleProfileClick = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={s.header}>
      <div className={s.contain}>
        <div className={s.logo}>Korochki.Net</div>
        <div className={s.knopki}>
          <a href='#catal' className={s.navButton}>КАТАЛОГ</a>
          <a href='#conta' className={s.navButton}>КОНТАКТЫ</a>

          {token ? (
            <button onClick={handleProfileClick} className={s.navButton}>
              ЛИЧНЫЙ КАБИНЕТ
            </button>
          ) : (
            <Link to="/login" className={s.navButton}>
              ВОЙТИ
            </Link>
          )}

          {!token && (
            <Link to="/register" className={s.navButton}>
              РЕГИСТРАЦИЯ
            </Link>
          )}
        </div>
      </div>

      {/* Якоря */}
      <button id='conta' style={{ position: 'absolute', border: 'none', backgroundColor: 'transparent', marginTop: '6700px' }}></button>
      <button id='catal' style={{ position: 'absolute', border: 'none', backgroundColor: 'transparent', marginTop: '4600px' }}></button>
    </div>
  );
};

export default Header;