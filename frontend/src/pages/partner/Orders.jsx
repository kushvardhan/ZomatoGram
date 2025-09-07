import React from 'react';
import { motion } from 'framer-motion';

const PartnerOrders = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="heading-2 mb-2">Orders Management</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage incoming orders and track their status.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-8 text-center"
      >
        <p className="text-neutral-600 dark:text-neutral-400">
          Order management system coming soon...
        </p>
      </motion.div>
    </div>
  );
};

export default PartnerOrders;
