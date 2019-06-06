import React from 'react';
import LoginGate from './LoginGate';
import AdminList from './AdminList';
const AdminGate = props => {
  return (
    <LoginGate>
      <AdminList />
    </LoginGate>
  );
};

export default AdminGate;