import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// requiere authentication
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  
  // if not redirect to signin page
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}