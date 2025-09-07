import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="heading-1">Order Confirmed</h1>
        <p className="body-large">Order ID: {orderId}</p>
        <div className="mt-8 p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <p className="text-neutral-600 dark:text-neutral-400">
            Order confirmation and tracking coming soon...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
