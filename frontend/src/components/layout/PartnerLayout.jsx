import { motion } from "framer-motion";
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  Moon,
  ShoppingBag,
  Sun,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ZomatoGramLogo } from "../../assets/logos";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";
import "./PartnerLayout.css";

const PartnerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/partner", icon: LayoutDashboard },
    { name: "Orders", href: "/partner/orders", icon: ShoppingBag },
    { name: "Menu", href: "/partner/menu", icon: MenuIcon },
    { name: "Analytics", href: "/partner/analytics", icon: BarChart3 },
    { name: "Profile", href: "/partner/profile", icon: User },
  ];

  const isActive = (href) => {
    if (href === "/partner") {
      return location.pathname === "/partner";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="partner-layout">
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn("partner-sidebar", !isSidebarOpen && "collapsed")}
        animate={{ width: isSidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar Header */}
        <div className="partner-sidebar-header">
          <ZomatoGramLogo className="partner-logo" />
          <span className="partner-logo-text">Partner</span>
        </div>

        {/* Navigation */}
        <nav className="partner-sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn("partner-nav-item", active && "active")}
              >
                <Icon className="partner-nav-icon" />
                <span className="partner-nav-text">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="partner-sidebar-footer">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="partner-toggle-button"
          >
            <ChevronLeft
              className={cn(
                "transition-transform",
                !isSidebarOpen && "rotate-180"
              )}
            />
          </button>

          <button onClick={toggleTheme} className="partner-theme-button">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="partner-logout-button"
          >
            <LogOut size={16} />
          </button>
        </div>
      </motion.aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.aside
            className="relative flex flex-col w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
              <Link to="/partner" className="flex items-center space-x-2">
                <ZomatoGramLogo className="w-8 h-8 text-primary-600" />
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Partner
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-full justify-start"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                <span className="ml-3">Toggle Theme</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4" />
                <span className="ml-3">Sign Out</span>
              </Button>
            </div>
          </motion.aside>
        </div>
      )}

      {/* Main Content */}
      <div className={cn("partner-main", !isSidebarOpen && "expanded")}>
        <div className="partner-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PartnerLayout;
