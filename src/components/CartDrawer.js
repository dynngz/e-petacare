import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Tu Carrito</h2>
        <button onClick={onClose}>Cerrar</button>
      </div>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            ))}
            <button className="clear-button" onClick={clearCart}>Vaciar Carrito</button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
