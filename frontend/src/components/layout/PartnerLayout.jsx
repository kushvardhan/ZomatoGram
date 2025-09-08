import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  ChevronLeft,
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
import { Link, Outlet, useLocation } from "react-router-dom";
import { ZomatoGramLogo } from "../../assets/logos";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          "hidden lg:flex flex-col bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-16"
        )}
        animate={{ width: isSidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          {isSidebarOpen && (
            <Link to="/partner" className="flex items-center space-x-2">
              <ZomatoGramLogo className="w-8 h-8 text-primary-600" />
              <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Partner
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2"
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform",
                !isSidebarOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={cn(
              "w-full justify-start",
              !isSidebarOpen && "justify-center"
            )}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            {isSidebarOpen && <span className="ml-3">Toggle Theme</span>}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className={cn(
              "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut className="w-4 h-4" />
            {isSidebarOpen && <span className="ml-3">Sign Out</span>}
          </Button>
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2"
              >
                <MenuIcon className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Partner Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  John's Restaurant
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PartnerLayout;
