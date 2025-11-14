
import React from 'react';
import s from '../../styles/AdminDashboard.module.css';

const StatusSelector = ({ currentStatus, onChange }) => {
  const statuses = [
    { value: 'not_started', label: 'Не начат' },
    { value: 'in_progress', label: 'В процессе' },
    { value: 'completed', label: 'Завершён' },
  ];

  return (
    <select
      className={s.statusSelect}
      value={currentStatus || 'not_started'}
      onChange={(e) => onChange(e.target.value)}
    >
      {statuses.map(status => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelector;