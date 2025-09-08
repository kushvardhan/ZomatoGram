import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredUserType = null, redirectTo = '/auth?mode=signin&type=user' }) => {
  const { isAuthenticated, userType, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loader mx-auto"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If specific user type is required and doesn't match, redirect
  if (requiredUserType && userType !== requiredUserType) {
    const correctRedirect = requiredUserType === 'partner' 
      ? '/auth?mode=signin&type=partner' 
      : '/auth?mode=signin&type=user';
    return <Navigate to={correctRedirect} state={{ from: location }} replace />;
  }

  // User is authenticated and has correct permissions
  return children;
};

export default ProtectedRoute;
