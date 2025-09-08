import { motion } from "framer-motion";
import "./pages.css";

const Orders = () => {
  const mockOrders = [
    {
      id: "#12345",
      restaurant: "Pizza Palace",
      status: "delivered",
      date: "2024-01-15",
      total: "$24.99",
    },
    {
      id: "#12344",
      restaurant: "Burger Barn",
      status: "pending",
      date: "2024-01-14",
      total: "$18.50",
    },
  ];

  return (
    <div className="orders-container">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="page-header"
        >
          <h1 className="page-title">Order History</h1>
          <p className="page-subtitle">Track your past and current orders</p>
        </motion.div>

        <div className="orders-list">
          {mockOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="order-card"
            >
              <div className="order-header">
                <div className="order-id">Order {order.id}</div>
                <div className={`order-status ${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              <div className="order-details">
                <p>
                  <strong>{order.restaurant}</strong>
                </p>
                <p>
                  {order.date} • {order.total}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
