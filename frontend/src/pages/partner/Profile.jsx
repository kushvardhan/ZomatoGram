import { motion } from "framer-motion";
import "../pages.css";

const PartnerProfile = () => {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="page-header"
      >
        <h1 className="page-title">Restaurant Profile</h1>
        <p className="page-subtitle">
          Manage your restaurant information and settings
        </p>
      </motion.div>

      <div className="page-content">
        <div className="page-placeholder">
          <div className="page-placeholder-icon">🏪</div>
          <div className="page-placeholder-text">
            Restaurant profile management coming soon...
          </div>
          <a href="/partner" className="page-cta-button">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
