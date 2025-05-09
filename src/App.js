import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />   
          <AppRouter /> 
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
