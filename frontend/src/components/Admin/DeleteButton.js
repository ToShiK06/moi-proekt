// src/components/Admin/DeleteButton.js
import React from 'react';
import s from '../../styles/AdminDashboard.module.css';

const DeleteButton = ({ userId, onDelete }) => {
  return (
    <button
      className={s.deleteButton}
      onClick={() => onDelete(userId)}
    >
      Удалить
    </button>
  );
};

export default DeleteButton;