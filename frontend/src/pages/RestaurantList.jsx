import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./restaurants/RestaurantList.css";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setRestaurants([
        {
          id: 1,
          name: "Pizza Palace",
          cuisine: "Italian",
          rating: 4.5,
          deliveryTime: "25-35 min",
          deliveryFee: "Free",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          promoted: true,
        },
        {
          id: 2,
          name: "Burger Barn",
          cuisine: "American",
          rating: 4.2,
          deliveryTime: "20-30 min",
          deliveryFee: "$2.99",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
        },
        {
          id: 3,
          name: "Sushi Zen",
          cuisine: "Japanese",
          rating: 4.8,
          deliveryTime: "30-45 min",
          deliveryFee: "Free",
          image:
            "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        },
        {
          id: 4,
          name: "Taco Fiesta",
          cuisine: "Mexican",
          rating: 4.3,
          deliveryTime: "15-25 min",
          deliveryFee: "$1.99",
          image:
            "https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=400&h=300&fit=crop",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filters = [
    { id: "all", label: "All" },
    { id: "italian", label: "Italian" },
    { id: "american", label: "American" },
    { id: "japanese", label: "Japanese" },
    { id: "mexican", label: "Mexican" },
  ];

  const filteredRestaurants =
    filter === "all"
      ? restaurants
      : restaurants.filter((r) => r.cuisine.toLowerCase() === filter);

  return (
    <div className="restaurant-list-container">
      <div className="restaurant-list-header">
        <div className="container">
          <h1 className="restaurant-list-title">Restaurants</h1>
          <p className="restaurant-list-subtitle">
            Discover amazing restaurants in your area and get your favorite
            meals delivered
          </p>
        </div>
      </div>

      <div className="restaurant-list-content">
        <div className="container">
          <div className="restaurant-filters">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`restaurant-filter-button ${
                  filter === f.id ? "active" : ""
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="restaurant-loading">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="restaurant-skeleton">
                  <div className="restaurant-skeleton-image"></div>
                  <div className="restaurant-skeleton-content">
                    <div className="restaurant-skeleton-line"></div>
                    <div className="restaurant-skeleton-line short"></div>
                    <div className="restaurant-skeleton-line medium"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="restaurant-grid">
              {filteredRestaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/restaurant/${restaurant.id}`}>
                    <div className="restaurant-card">
                      {restaurant.promoted && (
                        <div className="restaurant-promoted-badge">
                          Promoted
                        </div>
                      )}
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="restaurant-card-image"
                      />
                      <div className="restaurant-card-content">
                        <div className="restaurant-card-header">
                          <h3 className="restaurant-card-name">
                            {restaurant.name}
                          </h3>
                          <div className="restaurant-card-rating">
                            <Star size={12} fill="currentColor" />
                            {restaurant.rating}
                          </div>
                        </div>
                        <p className="restaurant-card-cuisine">
                          {restaurant.cuisine}
                        </p>
                        <div className="restaurant-card-footer">
                          <div className="restaurant-card-delivery">
                            <Clock size={14} />
                            {restaurant.deliveryTime}
                          </div>
                          <div className="restaurant-card-fee">
                            {restaurant.deliveryFee}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
