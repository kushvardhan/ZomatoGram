import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'user' or 'partner'
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('zomatogram_user');
        const savedUserType = localStorage.getItem('zomatogram_user_type');
        const savedToken = localStorage.getItem('zomatogram_token');

        if (savedUser && savedUserType && savedToken) {
          setUser(JSON.parse(savedUser));
          setUserType(savedUserType);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear invalid data
        localStorage.removeItem('zomatogram_user');
        localStorage.removeItem('zomatogram_user_type');
        localStorage.removeItem('zomatogram_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials, type = 'user') => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on type
      const userData = {
        id: Date.now(),
        email: credentials.email,
        name: type === 'partner' ? credentials.restaurantName || 'Restaurant Owner' : credentials.fullName || 'User',
        type: type,
        ...(type === 'partner' && {
          restaurantName: credentials.restaurantName,
          address: credentials.address,
          cuisineType: credentials.cuisineType
        })
      };

      const mockToken = `mock_token_${Date.now()}`;

      // Save to localStorage
      localStorage.setItem('zomatogram_user', JSON.stringify(userData));
      localStorage.setItem('zomatogram_user_type', type);
      localStorage.setItem('zomatogram_token', mockToken);

      setUser(userData);
      setUserType(type);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData, type = 'user') => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: type === 'partner' ? userData.restaurantName : userData.fullName,
        type: type,
        ...(type === 'partner' && {
          restaurantName: userData.restaurantName,
          address: userData.address,
          cuisineType: userData.cuisineType
        })
      };

      const mockToken = `mock_token_${Date.now()}`;

      // Save to localStorage
      localStorage.setItem('zomatogram_user', JSON.stringify(newUser));
      localStorage.setItem('zomatogram_user_type', type);
      localStorage.setItem('zomatogram_token', mockToken);

      setUser(newUser);
      setUserType(type);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('zomatogram_user');
    localStorage.removeItem('zomatogram_user_type');
    localStorage.removeItem('zomatogram_token');

    // Reset state
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('zomatogram_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    userType,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    // Helper functions
    isUser: userType === 'user',
    isPartner: userType === 'partner',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
