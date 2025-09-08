# 🍕 ZomatoGram - Food Delivery Platform

A modern, full-stack food delivery application built with React, Node.js, Express, and MongoDB. ZomatoGram connects hungry customers with local restaurants through an elegant, responsive interface.

## ✨ Features

### 🎨 Design System
- **Modern UI**: Clean, minimalist design with smooth animations
- **Dark/Light Mode**: Automatic system theme detection with manual toggle
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **5 Animated SVG Logos**: Unique logo variants with smooth animations

### 👥 User Features
- **Authentication**: Secure sign up/sign in with form validation
- **Restaurant Discovery**: Browse restaurants by cuisine, rating, and location
- **Advanced Search**: Find restaurants, dishes, and cuisines
- **Shopping Cart**: Add items, customize orders, and checkout
- **Order Tracking**: Real-time order status updates
- **User Profile**: Manage addresses, payment methods, and preferences
- **Order History**: View past orders and reorder favorites

### 🏪 Partner Features
- **Partner Dashboard**: Comprehensive restaurant management interface
- **Order Management**: Accept, prepare, and track orders
- **Menu Management**: Add, edit, and organize menu items
- **Analytics**: Revenue tracking and performance metrics
- **Profile Management**: Update restaurant information and settings

### 🛠 Technical Features
- **Modern Stack**: React 18, Node.js, Express, MongoDB
- **State Management**: Redux Toolkit for complex state
- **Routing**: React Router with protected routes
- **Animations**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS with custom design system
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Comprehensive component library
- **Toast Notifications**: Context-based notification system

## 🗂 Project Structure

```
ZomatoGram/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── assets/          # Static assets and logos
│   │   │   └── logos/       # 5 animated SVG logo variants
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/          # Core UI components
│   │   │   └── layout/      # Layout components
│   │   ├── pages/           # Page components
│   │   │   ├── auth/        # Authentication pages
│   │   │   └── partner/     # Partner dashboard pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── routes/          # Routing configuration
│   │   ├── styles/          # CSS and design system
│   │   └── utils/           # Utility functions
│   ├── public/              # Public assets
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── controllers/     # Route controllers
│   │   └── utils/           # Backend utilities
│   └── package.json         # Backend dependencies
└── README.md               # Project documentation
```

## 🛣 Routes & Navigation

### 🌐 Public Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with hero, cuisines, featured restaurants |
| `/restaurants` | RestaurantList | Browse all restaurants with filters |
| `/restaurant/:id` | RestaurantDetail | Restaurant details, menu, and ordering |
| `/search` | Search | Search results with advanced filtering |
| `/sticker-sheet` | StickerSheet | UI component showcase and documentation |

### 🔐 Authentication Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/signin-user` | UserSignIn | Customer login page |
| `/signup-user` | UserSignUp | Customer registration page |
| `/signin-partner` | PartnerSignIn | Restaurant partner login |
| `/signup-partner` | PartnerSignUp | Restaurant partner registration |

### 👤 User Protected Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/profile` | Profile | User profile and account settings |
| `/orders` | Orders | Order history and tracking |
| `/cart` | Cart | Shopping cart and item management |
| `/checkout` | Checkout | Order checkout and payment |
| `/order-confirmation/:orderId` | OrderConfirmation | Order confirmation and tracking |

### 🏪 Partner Dashboard Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/partner` | PartnerDashboard | Main dashboard with analytics overview |
| `/partner/orders` | PartnerOrders | Order management and status updates |
| `/partner/menu` | PartnerMenu | Menu item management (CRUD operations) |
| `/partner/profile` | PartnerProfile | Restaurant profile and settings |
| `/partner/analytics` | PartnerAnalytics | Revenue and performance analytics |

### ❌ Error Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/404` or `*` | NotFound | 404 error page with navigation options |
| `/500` | ServerError | 500 error page with retry functionality |

## 🎨 UI Components Library

### Core Components
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger) with loading states
- **Input**: Form inputs with validation, icons, and accessibility features
- **Card**: Interactive cards with hover effects and variants
- **Modal**: Accessible modals with backdrop blur and keyboard navigation
- **Dropdown**: Dropdown menus and select components with positioning
- **Tabs**: Animated tab switching with smooth transitions
- **Toast**: Context-based notification system with multiple types
- **Loader**: Multiple loading variants (spinner, dots, pulse, bars)
- **Skeleton**: Loading states for different content types

### Layout Components
- **Navbar**: Responsive navigation with search, theme toggle, and user menu
- **Footer**: Complete footer with newsletter, social links, and app download
- **Layout**: Main layout wrapper for public pages
- **PartnerLayout**: Sidebar layout for partner dashboard

### Specialized Components
- **Logo Variants**: 5 animated SVG logos with different themes
- **StickerSheet**: Component showcase and documentation page

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ZomatoGram
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   Create `.env` files in both frontend and backend directories with necessary environment variables.

5. **Start the development servers**
   
   Frontend (React):
   ```bash
   cd frontend
   npm run dev
   ```
   
   Backend (Node.js):
   ```bash
   cd backend
   npm run dev
   ```

### 🌐 Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Component Library**: http://localhost:5173/sticker-sheet

## 🎯 Key Features in Detail

### 🎨 Design System
- **CSS Variables**: Comprehensive design tokens for colors, spacing, typography
- **Theme Support**: Automatic dark/light mode with smooth transitions
- **Responsive Design**: Mobile-first approach with breakpoint system
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### 🔐 Authentication System
- **Dual User Types**: Separate authentication for customers and restaurant partners
- **Secure**: JWT tokens with httpOnly cookies and bcrypt password hashing
- **Validation**: Client and server-side validation with Zod schemas
- **User Experience**: Smooth form interactions with loading states and error handling

### 📱 Responsive Experience
- **Mobile Optimized**: Touch-friendly interface with proper spacing
- **Progressive Enhancement**: Works on all devices and screen sizes
- **Performance**: Optimized loading with skeleton states and lazy loading

## 🛠 Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing with protected routes
- **Redux Toolkit**: State management for complex application state
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Smooth animations and transitions
- **React Hook Form**: Performant form handling with validation
- **Zod**: TypeScript-first schema validation
- **Lucide React**: Beautiful, customizable icons

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Fast, unopinionated web framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: Elegant MongoDB object modeling
- **JWT**: JSON Web Tokens for secure authentication
- **Bcrypt**: Password hashing for security
- **Joi/Zod**: Request validation and sanitization

## 👨‍💻 Developer Information

**Created by**: Kush Vardhan  
**Email**: kushvardhan39797@gmail.com  
**Project**: ZomatoGram - Food Delivery Platform  

## 📄 License

This project is created for educational and portfolio purposes.

---

*ZomatoGram - Bringing delicious food to your doorstep with style! 🚀*
