import { motion } from "framer-motion";
import "./pages.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="page-header"
        >
          <h1 className="page-title">User Profile</h1>
          <p className="page-subtitle">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="profile-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="profile-card"
          >
            <div className="profile-avatar">JD</div>
            <h2 className="profile-name">John Doe</h2>
            <p className="profile-email">john.doe@example.com</p>

            <div className="page-placeholder">
              <div className="page-placeholder-text">
                Profile management features coming soon...
              </div>
              <a href="/" className="page-cta-button">
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
