import {
  Bell,
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
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";
import Dropdown, { DropdownDivider, DropdownItem } from "../ui/Dropdown";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, userType, logout } = useAuth();

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

  // const userMenuItems = [
  //   { label: "Profile", href: "/profile" },
  //   { label: "Orders", href: "/orders" },
  //   { label: "Addresses", href: "/addresses" },
  //   { label: "Settings", href: "/settings" },
  // ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <ZomatoGramLogo className="navbar-logo-icon" />
            <span>ZomatoGram</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn("navbar-nav-link", item.current && "active")}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="navbar-search">
            <form onSubmit={handleSearch}>
              <Search className="navbar-search-icon" />
              <input
                type="search"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="navbar-search-input"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {/* Theme Toggle */}
            <button
              className="navbar-action-button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>

            {/* Notifications */}
            <button className="navbar-action-button">
              <Bell />
            </button>

            {/* Cart */}
            <button className="navbar-action-button">
              <ShoppingCart />
              <span className="cart-badge">3</span>
            </button>

            {/* User Menu */}
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              }
              align="right"
            >
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                    <p className="text-sm font-medium">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-neutral-500">{user?.email}</p>
                    <p className="text-xs text-primary-500 capitalize">
                      {userType} Account
                    </p>
                  </div>
                  {userType === "user" && (
                    <>
                      <Link to="/profile">
                        <DropdownItem>Profile</DropdownItem>
                      </Link>
                      <Link to="/orders">
                        <DropdownItem>My Orders</DropdownItem>
                      </Link>
                      <Link to="/restaurants">
                        <DropdownItem>Browse Restaurants</DropdownItem>
                      </Link>
                    </>
                  )}
                  {userType === "partner" && (
                    <>
                      <Link to="/partner">
                        <DropdownItem>Dashboard</DropdownItem>
                      </Link>
                      <Link to="/partner/orders">
                        <DropdownItem>Manage Orders</DropdownItem>
                      </Link>
                      <Link to="/partner/menu">
                        <DropdownItem>Manage Menu</DropdownItem>
                      </Link>
                    </>
                  )}
                  <DropdownDivider />
                  <DropdownItem onClick={logout}>Sign Out</DropdownItem>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                    <p className="text-sm font-medium">Guest User</p>
                    <p className="text-xs text-neutral-500">Not signed in</p>
                  </div>
                  <Link to="/auth?mode=signin&type=user">
                    <DropdownItem>Sign In</DropdownItem>
                  </Link>
                  <Link to="/auth?mode=signup&type=user">
                    <DropdownItem>Sign Up</DropdownItem>
                  </Link>
                  <DropdownDivider />
                  <Link to="/auth?mode=signin&type=partner">
                    <DropdownItem>Partner Login</DropdownItem>
                  </Link>
                </>
              )}
            </Dropdown>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-search">
            <Search className="navbar-search-icon" />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-menu-search-input"
            />
          </div>

          <div className="mobile-menu-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn("mobile-menu-nav-link", item.current && "active")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-actions">
            <button
              className="navbar-action-button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <button className="navbar-action-button">
              <Bell />
            </button>
            <button className="navbar-action-button">
              <ShoppingCart />
              <span className="cart-badge">3</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
