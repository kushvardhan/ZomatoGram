import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { ZomatoGramLogo5 } from '../assets/logos';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <ZomatoGramLogo5 className="w-24 h-24 mx-auto text-primary-600" animate={true} />
          
          <div className="space-y-4">
            <h1 className="text-8xl lg:text-9xl font-bold text-primary-600">404</h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Page Not Found
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Oops! The page you're looking for seems to have gone on a food delivery. 
              Let's get you back to something delicious.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button size="lg" leftIcon={<Home className="w-5 h-5" />}>
              Go Home
            </Button>
          </Link>
          
          <Link to="/restaurants">
            <Button variant="outline" size="lg" leftIcon={<Search className="w-5 h-5" />}>
              Browse Restaurants
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
