// Rutas para usuarios SÍ logueados
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Lookbook from '../pages/Lookbook';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppStack() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/lookbook" element={<Lookbook />} />
      {/* PROTEGIDAS */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
