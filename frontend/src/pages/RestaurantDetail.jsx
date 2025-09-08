import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import "./pages.css";

const RestaurantDetail = () => {
  const { id } = useParams();

  const mockRestaurant = {
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    description: "Authentic Italian pizzas made with fresh ingredients",
  };

  const mockMenu = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, basil",
      price: "$18.99",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Pepperoni, mozzarella, tomato sauce",
      price: "$21.99",
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Romaine lettuce, parmesan, croutons",
      price: "$12.99",
    },
  ];

  return (
    <div className="restaurant-detail-container">
      <div className="restaurant-hero">
        <div className="restaurant-hero-content">
          <h1 className="restaurant-hero-name">{mockRestaurant.name}</h1>
          <p className="restaurant-hero-cuisine">
            {mockRestaurant.cuisine} • ⭐ {mockRestaurant.rating}
          </p>
        </div>
      </div>

      <div className="restaurant-info">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="restaurant-menu"
          >
            <div className="menu-section">
              <h2 className="menu-section-title">Menu</h2>
              <div className="menu-grid">
                {mockMenu.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: item.id * 0.1 }}
                    className="menu-item"
                  >
                    <h3 className="menu-item-name">{item.name}</h3>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-price">{item.price}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
