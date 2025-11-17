import React from 'react';
import StatusSelector from './StatusSelector';
import DeleteButton from './DeleteButton';
import s from '../../styles/AdminDashboard.module.css';

import { updateUserStatus, deleteUser as apiDeleteUser } from '../../services/adminApi';

const UserTable = ({ users }) => {
  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateUserStatus(userId, newStatus); 
      alert('Статус обновлён');
      
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      alert(error.message || 'Ошибка обновления статуса');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) return;

    try {
      await apiDeleteUser(userId); 
      alert('Пользователь удалён');
      window.location.reload(); 
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
      alert(error.message || 'Ошибка удаления пользователя');
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