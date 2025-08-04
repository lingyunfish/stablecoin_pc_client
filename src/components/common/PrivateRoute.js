import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const PrivateRoute = ({ children }) => {
  console.log('PrivateRoute children:', children);
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
