import React from 'react';
import { motion } from 'framer-motion';

const Orders = () => {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="heading-1">Order History</h1>
        <p className="body-large">View your past orders and reorder favorites</p>
        <div className="mt-8 p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <p className="text-neutral-600 dark:text-neutral-400">
            Order history and tracking coming soon...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Orders;
