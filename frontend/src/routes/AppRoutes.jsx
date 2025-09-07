import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastProvider } from "../components/ui/Toast";

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
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public Routes with Main Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="restaurants" element={<RestaurantList />} />
            <Route path="restaurant/:id" element={<RestaurantDetail />} />
            <Route path="search" element={<Search />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation/:orderId"
              element={<OrderConfirmation />}
            />

            {/* User Protected Routes */}
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />

            {/* Utility Routes */}
            <Route path="sticker-sheet" element={<StickerSheet />} />
          </Route>

          {/* Authentication Routes (No Layout) */}
          <Route path="signin-user" element={<UserSignIn />} />
          <Route path="signup-user" element={<UserSignUp />} />
          <Route path="signin-partner" element={<PartnerSignIn />} />
          <Route path="signup-partner" element={<PartnerSignUp />} />

          {/* Partner Dashboard Routes */}
          <Route path="partner" element={<PartnerLayout />}>
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
  );
};

export default AppRoutes;
