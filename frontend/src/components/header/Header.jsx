import React from 'react';
import s from "./Header.module.css";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  
  const token = localStorage.getItem('token'); 
  const role = localStorage.getItem('role');

  
  const adminToken = localStorage.getItem('admin_token');
  const adminRole = localStorage.getItem('admin_role');

  const handleProfileClick = () => {
    if (token) { 
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleAdminClick = () => {
    if (adminToken && adminRole === 'admin') {
      navigate('/admin-panel');
    } else {
      navigate('/admin-login');
    }
  };

  return (
    <div className={`${s.header} fade-in`} style={{ position: 'relative' }}>
      <div className={s.contain}>
        <div className={`logo fade-in-delay-1 ${s.logo}`}>
          Korochki.Net
        </div>
        <div className={s.knopki}>
          <a href='#catal' className={`${s.navButton} fade-in-delay-2`}>КАТАЛОГ</a>
          <a href='#conta' className={`${s.navButton} fade-in-delay-2`}>КОНТАКТЫ</a>
          
        
          {token ? ( 
            <button 
              onClick={handleProfileClick} 
              className={`${s.navButton} fade-in-delay-3`}
            >
              ЛИЧНЫЙ КАБИНЕТ
            </button>
          ) : (
            <Link to="/login" className={s.navButton}>ВОЙТИ</Link>
          )}

          
          <button 
            onClick={handleAdminClick} 
            className={`${s.navButton} fade-in-delay-3`}
          >
            {adminToken && adminRole === 'admin' ? 'АДМИН-ПАНЕЛЬ' : 'ВХОД АДМИН'}
          </button>

          
          {!token && (
            <Link to="/register" className={s.navButton}>РЕГИСТРАЦИЯ</Link>
          )}
        </div>
      </div>
      <button id='conta' style={{position:"absolute", border:"none", backgroundColor:'transparent', marginTop:'6700px'}}></button>
      <button id='catal' style={{position:"absolute", border:"none", backgroundColor:'transparent', marginTop:'4600px'}}></button>
    </div>
  );
};

export default Header;