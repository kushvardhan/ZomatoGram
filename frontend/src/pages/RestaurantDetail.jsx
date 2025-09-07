import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const RestaurantDetail = () => {
  const { id } = useParams();

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="heading-1">Restaurant Details</h1>
        <p className="body-large">Restaurant ID: {id}</p>
        <div className="mt-8 p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <p className="text-neutral-600 dark:text-neutral-400">
            Restaurant detail page with menu, reviews, and ordering coming soon...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantDetail;
