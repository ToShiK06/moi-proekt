

import React from 'react';
import UserTable from './UserTable';

import s from '../../styles/AdminDashboard.module.css'; 

const AdminPanel = ({ users }) => {


  
  return (
    <div className={s.adminPanel}>
      
      <UserTable users={users} />
    </div>
  );
};

export default AdminPanel;