import { Navigate } from 'react-router-dom';

const getUser = () => JSON.parse(localStorage.getItem('user'));

export const OwnerRoute = ({ children }) => {
  const user = getUser();
  if (!user || user.role !== 'owner') return <Navigate to="/login" />;
  return children;
};

export const AdminRoute = ({ children }) => {
  const user = getUser();
  if (!user || !['admin', 'owner'].includes(user.role)) return <Navigate to="/login" />;
  return children;
};

export const StaffRoute = ({ children }) => {
  const user = getUser();
  if (!user || !['staff', 'admin', 'owner'].includes(user.role)) return <Navigate to="/login" />;
  return children;
};

export const DesignerRoute = ({ children }) => {
  const user = getUser();
  if (!user || user.role !== 'designer') return <Navigate to="/login" />;
  return children;
};