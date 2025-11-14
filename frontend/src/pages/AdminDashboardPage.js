
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../styles/AdminDashboard.module.css';
import AdminPanel from '../components/Admin/AdminPanel';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login'); 
    }
  }, [navigate]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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