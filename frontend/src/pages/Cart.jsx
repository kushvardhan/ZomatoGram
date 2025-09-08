import { motion } from "framer-motion";
import "./Cart.css";

const Cart = () => {
  return (
    <div className="cart-container">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="cart-header"
        >
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">Review your items before checkout</p>
        </motion.div>

        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-description">
            Add some delicious items to your cart to get started
          </p>
          <a href="/restaurants" className="cart-empty-btn">
            Browse Restaurants
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
