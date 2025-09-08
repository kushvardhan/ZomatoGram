import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import "./pages.css";

const Search = () => {
  return (
    <div className="search-container">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="page-header"
        >
          <h1 className="page-title">Search</h1>
          <p className="page-subtitle">
            Find restaurants, cuisines, and dishes
          </p>
        </motion.div>

        <div className="search-form">
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              className="search-input"
            />
          </div>
        </div>

        <div className="page-content">
          <div className="page-placeholder">
            <div className="page-placeholder-icon">🔍</div>
            <div className="page-placeholder-text">
              Start typing to search for delicious food...
            </div>
            <a href="/restaurants" className="page-cta-button">
              Browse All Restaurants
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
