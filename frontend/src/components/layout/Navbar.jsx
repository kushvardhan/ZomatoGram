import { motion } from "framer-motion";
import {
  Bell,
  MapPin,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ZomatoGramLogo } from "../../assets/logos";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";
import Dropdown, { DropdownDivider, DropdownItem } from "../ui/Dropdown";
import Input from "../ui/Input";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "Restaurants",
      href: "/restaurants",
      current: location.pathname === "/restaurants",
    },
    {
      name: "Cuisines",
      href: "/cuisines",
      current: location.pathname === "/cuisines",
    },
    {
      name: "Offers",
      href: "/offers",
      current: location.pathname === "/offers",
    },
  ];

  const userMenuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Orders", href: "/orders" },
    { label: "Addresses", href: "/addresses" },
    { label: "Settings", href: "/settings" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <nav className="sticky top-0 z-sticky bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ZomatoGramLogo className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              ZomatoGram
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-600",
                  item.current
                    ? "text-primary-600"
                    : "text-neutral-700 dark:text-neutral-300"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                className="w-full"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">Location</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              }
              align="right"
            >
              <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                <p className="text-sm font-medium">Guest User</p>
                <p className="text-xs text-neutral-500">Not signed in</p>
              </div>
              <Link to="/signin-user">
                <DropdownItem>Sign In</DropdownItem>
              </Link>
              <Link to="/signup-user">
                <DropdownItem>Sign Up</DropdownItem>
              </Link>
              <DropdownDivider />
              <Link to="/signin-partner">
                <DropdownItem>Partner Login</DropdownItem>
              </Link>
            </Dropdown>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search for restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              className="w-full"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden border-t border-neutral-200 dark:border-neutral-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  item.current
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/orders"
                className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
