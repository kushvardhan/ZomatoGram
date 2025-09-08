import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PublicRoute = ({ children, redirectAuthenticated = true }) => {
  const { isAuthenticated, userType, isLoading } = useAuth();

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

  // If authenticated and should redirect, go to appropriate dashboard
  if (isAuthenticated && redirectAuthenticated) {
    const redirectPath = userType === 'partner' ? '/partner' : '/restaurants';
    return <Navigate to={redirectPath} replace />;
  }

  // Show the public content
  return children;
};

export default PublicRoute;
