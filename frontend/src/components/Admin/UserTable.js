// src/components/Admin/UserTable.js
import React from 'react';
import StatusSelector from './StatusSelector';
import DeleteButton from './DeleteButton';
import s from '../../styles/AdminDashboard.module.css';

const UserTable = ({ users }) => {
  const handleStatusChange = async (userId, newStatus) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ course_status: newStatus }),
      });

      if (response.ok) {
        alert('Статус обновлён');
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) return;

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        alert('Пользователь удалён');
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
    }
  };

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Имя</th>
            <th>Роль</th>
            <th>Статус курса</th>
            <th>Дата создания</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>
                <StatusSelector
                  currentStatus={user.course_status}
                  onChange={(newStatus) => handleStatusChange(user.id, newStatus)}
                />
              </td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <DeleteButton userId={user.id} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;