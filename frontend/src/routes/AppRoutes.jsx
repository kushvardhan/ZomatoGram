import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastProvider } from "../components/ui/Toast";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Layout Components
import Layout from "../components/layout/Layout";
import PartnerLayout from "../components/layout/PartnerLayout";

// Pages
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import OrderConfirmation from "../pages/OrderConfirmation";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import RestaurantDetail from "../pages/RestaurantDetail";
import RestaurantList from "../pages/RestaurantList";
import Search from "../pages/Search";

// Authentication Pages
import AuthPage from "../pages/auth/AuthPage";

// Partner Dashboard Pages
import PartnerAnalytics from "../pages/partner/Analytics";
import PartnerDashboard from "../pages/partner/Dashboard";
import PartnerMenu from "../pages/partner/Menu";
import PartnerOrders from "../pages/partner/Orders";
import PartnerProfile from "../pages/partner/Profile";

// Utility Pages
import NotFound from "../pages/NotFound";
import ServerError from "../pages/ServerError";
import StickerSheet from "../pages/StickerSheet";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Routes with Main Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="sticker-sheet" element={<StickerSheet />} />
            </Route>

            {/* Protected User Routes with Main Layout */}
            <Route path="/" element={<Layout />}>
              <Route
                path="restaurants"
                element={
                  <ProtectedRoute requiredUserType="user">
                    <RestaurantList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="restaurant/:id"
                element={
                  <ProtectedRoute requiredUserType="user">
                    <RestaurantDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="search"
                element={
                  <ProtectedRoute requiredUserType="user">
                    <Search />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cart"
                element={
                  <ProtectedRoute requiredUserType="user">
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="checkout"
                element={
                  <ProtectedRoute requiredUserType="user">
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="order-confirmation/:orderId"
                element={
                  <ProtectedRoute requiredUserType="user">
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute requiredUserType="user">
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedRoute requiredUserType="user">
                    <Orders />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Authentication Routes (No Layout) */}
            <Route path="auth" element={<AuthPage />} />

            {/* Legacy redirects for old auth routes */}
            <Route path="signin-user" element={<AuthPage />} />
            <Route path="signup-user" element={<AuthPage />} />
            <Route path="signin-partner" element={<AuthPage />} />
            <Route path="signup-partner" element={<AuthPage />} />

            {/* Partner Dashboard Routes */}
            <Route
              path="partner"
              element={
                <ProtectedRoute requiredUserType="partner">
                  <PartnerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<PartnerDashboard />} />
              <Route path="orders" element={<PartnerOrders />} />
              <Route path="menu" element={<PartnerMenu />} />
              <Route path="profile" element={<PartnerProfile />} />
              <Route path="analytics" element={<PartnerAnalytics />} />
            </Route>

            {/* Error Routes */}
            <Route path="500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
