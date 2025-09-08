import { motion } from "framer-motion";
import "../pages.css";

const PartnerOrders = () => {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="page-header"
      >
        <h1 className="page-title">Orders Management</h1>
        <p className="page-subtitle">
          Manage incoming orders and track their status
        </p>
      </motion.div>

      <div className="page-content">
        <div className="page-placeholder">
          <div className="page-placeholder-icon">📋</div>
          <div className="page-placeholder-text">
            Order management system coming soon...
          </div>
          <a href="/partner" className="page-cta-button">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerOrders;
