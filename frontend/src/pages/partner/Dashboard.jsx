import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "1,234",
      change: "+12%",
      icon: ShoppingBag,
      type: "blue",
    },
    {
      title: "Revenue",
      value: "$12,345",
      change: "+8%",
      icon: DollarSign,
      type: "green",
    },
    {
      title: "Customers",
      value: "856",
      change: "+15%",
      icon: Users,
      type: "purple",
    },
    {
      title: "Growth",
      value: "23%",
      change: "+5%",
      icon: TrendingUp,
      type: "orange",
    },
  ];

  return (
    <div className="dashboard-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="dashboard-header"
      >
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">
          Welcome back! Here's what's happening with your restaurant.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="dashboard-stats"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="stat-card">
              <div className="stat-card-content">
                <div className="stat-card-info">
                  <h3>{stat.title}</h3>
                  <div className="stat-card-value">{stat.value}</div>
                  <div className="stat-card-change">
                    {stat.change} from last month
                  </div>
                </div>
                <div className={`stat-card-icon ${stat.type}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="dashboard-charts"
      >
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">Recent Orders</h3>
          </div>
          <div className="chart-placeholder">
            Recent orders management coming soon...
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">Revenue Chart</h3>
          </div>
          <div className="chart-placeholder">
            Revenue analytics coming soon...
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
