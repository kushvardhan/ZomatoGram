import {motion} from "framer-motion";
import { ArrowRight, Clock, Heart, Search, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { ZomatoGramLogo1 } from "../assets/logos";
import { SkeletonRestaurantCard } from "../components/ui/Skeleton";
import "./Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
//   const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const cuisines = [
    { id: 1, name: "Pizza", image: "🍕", color: "from-red-400 to-red-600" },
    {
      id: 2,
      name: "Burger",
      image: "🍔",
      color: "from-yellow-400 to-orange-600",
    },
    { id: 3, name: "Sushi", image: "🍣", color: "from-green-400 to-teal-600" },
    { id: 4, name: "Indian", image: "🍛", color: "from-orange-400 to-red-600" },
    { id: 5, name: "Chinese", image: "🥡", color: "from-red-400 to-pink-600" },
    {
      id: 6,
      name: "Mexican",
      image: "🌮",
      color: "from-yellow-400 to-red-600",
    },
    { id: 7, name: "Thai", image: "🍜", color: "from-green-400 to-blue-600" },
    { id: 8, name: "Italian", image: "🍝", color: "from-green-400 to-red-600" },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Mario's Italian Kitchen",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 324,
      cuisine: "Italian",
      deliveryTime: "25-35 min",
      deliveryFee: "Free",
      distance: "1.2 km",
      isPromoted: true,
    },
    {
      id: 2,
      name: "Spice Garden",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      rating: 4.3,
      reviews: 256,
      cuisine: "Indian",
      deliveryTime: "30-40 min",
      deliveryFee: "$2.99",
      distance: "2.1 km",
      isPromoted: false,
    },
    {
      id: 3,
      name: "Burger Palace",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 189,
      cuisine: "American",
      deliveryTime: "20-30 min",
      deliveryFee: "Free",
      distance: "0.8 km",
      isPromoted: true,
    },
    {
      id: 4,
      name: "Sushi Zen",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 412,
      cuisine: "Japanese",
      deliveryTime: "35-45 min",
      deliveryFee: "$3.99",
      distance: "3.2 km",
      isPromoted: false,
    },
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
      console.log("Searching for:", searchQuery);
    }
  };

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % Math.ceil(cuisines.length / 4));
  // };

  // const prevSlide = () => {
  //   setCurrentSlide(
  //     (prev) =>
  //       (prev - 1 + Math.ceil(cuisines.length / 4)) %
  //       Math.ceil(cuisines.length / 4)
  //   );
  // };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" />

        {/* Floating Elements */}
        <div className="hero-floating-elements">
          <div className="floating-element floating-element-1"></div>
          <div className="floating-element floating-element-2"></div>
          <div className="floating-element floating-element-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="hero-title">
                Delicious food,
                <span className="hero-title-gradient">delivered fast</span>
              </h1>

              <p className="hero-subtitle">
                Discover amazing restaurants in your area and get your favorite
                meals delivered in minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-search"
            >
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="search"
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </form>
            </motion.div>

            <div className="hero-features">
              <div className="hero-feature">
                <div className="hero-feature-icon hero-feature-icon-primary">
                  <Clock />
                </div>
                <span>Fast Delivery</span>
              </div>
              <div className="hero-feature">
                <div className="hero-feature-icon hero-feature-icon-accent">
                  <Star />
                </div>
                <span>Top Rated</span>
              </div>
              <div className="hero-feature">
                <div className="hero-feature-icon hero-feature-icon-orange">
                  <Truck />
                </div>
                <span>24/7 Service</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <ZomatoGramLogo1 className="hero-logo" animate={true} />
          </div>
        </div>
      </section>

      {/* Trending Cuisines */}
      <section className="cuisines-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Trending Cuisines</h2>
            <p className="section-subtitle">Explore popular food categories</p>
          </div>

          <div className="cuisines-grid">
            {cuisines.map((cuisine) => (
              <motion.div
                key={cuisine.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`/search?cuisine=${cuisine.name.toLowerCase()}`}>
                  <div className="cuisine-card">
                    <div className="cuisine-icon">
                      <div className="text-2xl">{cuisine.image}</div>
                    </div>
                    <h3 className="cuisine-name">{cuisine.name}</h3>
                    <p className="cuisine-count">
                      {cuisine.count || "50+"} restaurants
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
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
              <Button
                variant="outline"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonRestaurantCard key={index} />
                ))
              : restaurants.map((restaurant) => (
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
                                <span className="font-medium">
                                  {restaurant.rating}
                                </span>
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
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background-pattern">
          <div className="cta-pattern-circle cta-pattern-1"></div>
          <div className="cta-pattern-circle cta-pattern-2"></div>
          <div className="cta-pattern-circle cta-pattern-3"></div>
        </div>
        <div className="section-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to start your food journey?</h2>
            <p className="cta-subtitle">
              Join millions of food lovers and discover amazing restaurants in
              your area.
            </p>
            <div className="cta-buttons">
              <Link
                to="/auth?mode=signup&type=user"
                className="cta-button cta-button-primary"
              >
                Sign Up Now
                <ArrowRight />
              </Link>
              <Link
                to="/auth?mode=signup&type=partner"
                className="cta-button cta-button-secondary"
              >
                Become a Partner
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
