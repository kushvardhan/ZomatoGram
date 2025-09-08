import { motion } from "framer-motion";
import "./pages.css";

const Checkout = () => {
  return (
    <div className="checkout-container">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="page-header"
        >
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">
            Complete your order and enjoy your meal
          </p>
        </motion.div>

        <div className="page-content">
          <div className="page-placeholder">
            <div className="page-placeholder-icon">💳</div>
            <div className="page-placeholder-text">
              Secure checkout process coming soon...
            </div>
            <a href="/cart" className="page-cta-button">
              Back to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
