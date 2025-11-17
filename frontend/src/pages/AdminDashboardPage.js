
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../styles/AdminDashboard.module.css';
import AdminPanel from '../components/Admin/AdminPanel';

import { fetchUsers } from '../services/adminApi';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('admin_token'); 
    const role = localStorage.getItem('admin_role');   

    if (!token || role !== 'admin') {
      navigate('/admin-login'); 
    }
  }, [navigate]);

 
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error);
       
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div className={s.loading}>Загрузка...</div>;
  }

  return (
    <div className={s.adminDashboard}>
      <h1 className={s.title}>Админ-панель</h1>
      <AdminPanel users={users} />
    </div>
  );
};

export default AdminDashboardPage;