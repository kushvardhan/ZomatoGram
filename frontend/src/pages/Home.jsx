import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Truck, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus
} from 'lucide-react';
import { ZomatoGramLogo1 } from '../assets/logos';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { SkeletonRestaurantCard } from '../components/ui/Skeleton';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const cuisines = [
    { id: 1, name: 'Pizza', image: '🍕', color: 'from-red-400 to-red-600' },
    { id: 2, name: 'Burger', image: '🍔', color: 'from-yellow-400 to-orange-600' },
    { id: 3, name: 'Sushi', image: '🍣', color: 'from-green-400 to-teal-600' },
    { id: 4, name: 'Indian', image: '🍛', color: 'from-orange-400 to-red-600' },
    { id: 5, name: 'Chinese', image: '🥡', color: 'from-red-400 to-pink-600' },
    { id: 6, name: 'Mexican', image: '🌮', color: 'from-yellow-400 to-red-600' },
    { id: 7, name: 'Thai', image: '🍜', color: 'from-green-400 to-blue-600' },
    { id: 8, name: 'Italian', image: '🍝', color: 'from-green-400 to-red-600' },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Mario's Italian Kitchen",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 324,
      cuisine: "Italian",
      deliveryTime: "25-35 min",
      deliveryFee: "Free",
      distance: "1.2 km",
      isPromoted: true
    },
    {
      id: 2,
      name: "Spice Garden",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      rating: 4.3,
      reviews: 256,
      cuisine: "Indian",
      deliveryTime: "30-40 min",
      deliveryFee: "$2.99",
      distance: "2.1 km",
      isPromoted: false
    },
    {
      id: 3,
      name: "Burger Palace",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 189,
      cuisine: "American",
      deliveryTime: "20-30 min",
      deliveryFee: "Free",
      distance: "0.8 km",
      isPromoted: true
    },
    {
      id: 4,
      name: "Sushi Zen",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 412,
      cuisine: "Japanese",
      deliveryTime: "35-45 min",
      deliveryFee: "$3.99",
      distance: "3.2 km",
      isPromoted: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      console.log('Searching for:', searchQuery);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(cuisines.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(cuisines.length / 4)) % Math.ceil(cuisines.length / 4));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center mb-6">
                <ZomatoGramLogo1 className="w-16 h-16 text-primary-600" animate={true} />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                Delicious food,
                <span className="text-gradient block">delivered fast</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                Discover amazing restaurants in your area and get your favorite meals delivered in minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search for restaurants, cuisines, or dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<Search className="w-5 h-5" />}
                    className="h-14 text-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 px-8"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Search
                </Button>
              </form>
              
              <div className="flex items-center justify-center mt-4 text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Delivering to: Downtown, New York</span>
                <Button variant="ghost" size="sm" className="ml-2 text-primary-600">
                  Change
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-8"
            >
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary-600" />
                </div>
                <span className="font-medium">Fast Delivery</span>
              </div>
              
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent-600" />
                </div>
                <span className="font-medium">Top Rated</span>
              </div>
              
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <span className="font-medium">24/7 Service</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Cuisines */}
      <section className="py-16 bg-white dark:bg-neutral-800">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-2 mb-2">Trending Cuisines</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Explore popular food categories
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={prevSlide}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={nextSlide}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(cuisines.length / 4) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {cuisines.slice(slideIndex * 4, (slideIndex + 1) * 4).map((cuisine) => (
                      <motion.div
                        key={cuisine.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link to={`/search?cuisine=${cuisine.name.toLowerCase()}`}>
                          <Card className="card-hover text-center p-6">
                            <CardContent>
                              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${cuisine.color} flex items-center justify-center text-2xl`}>
                                {cuisine.image}
                              </div>
                              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                {cuisine.name}
                              </h3>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-2 mb-2">Featured Restaurants</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Top-rated restaurants near you
              </p>
            </div>
            
            <Link to="/restaurants">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonRestaurantCard key={index} />
              ))
            ) : (
              restaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: restaurant.id * 0.1 }}
                >
                  <Link to={`/restaurant/${restaurant.id}`}>
                    <Card className="card-interactive overflow-hidden">
                      <div className="relative">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-48 object-cover"
                        />
                        {restaurant.isPromoted && (
                          <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Promoted
                          </div>
                        )}
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <Heart className="w-4 h-4 text-neutral-600" />
                        </button>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                            {restaurant.name}
                          </h3>
                          
                          <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{restaurant.rating}</span>
                              <span>({restaurant.reviews})</span>
                            </div>
                            <span>•</span>
                            <span>{restaurant.cuisine}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
                              <Clock className="w-4 h-4" />
                              <span>{restaurant.deliveryTime}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-neutral-900 dark:text-neutral-100">
                                {restaurant.deliveryFee}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {restaurant.distance}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to start your food journey?
            </h2>
            <p className="text-xl text-primary-100">
              Join millions of food lovers and discover amazing restaurants in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup-user">
                <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-neutral-100">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/signup-partner">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
