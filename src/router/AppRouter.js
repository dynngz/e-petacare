import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function AppRouter() {
    const { isAuthenticated } = useContext(AuthContext);
  
    return isAuthenticated ? <AppStack /> : <AuthStack />;
  }