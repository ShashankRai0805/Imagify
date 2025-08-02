import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credits, setCredits] = useState(5);
  const [loading, setLoading] = useState(false);

  const backendUrl = 'http://localhost:5000';

  const getUserCredits = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/credits`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
      } else {
        console.error('Failed to fetch credits:', data.message);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  }, [token, backendUrl]);

  // Check if user is logged in on app start
  useEffect(() => {
    if (token) {
      getUserCredits();
    }
  }, [token, getUserCredits]);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        await getUserCredits();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        await getUserCredits();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setCredits(5);
    localStorage.removeItem('token');
  };

  const generateImage = async (prompt) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/image/generate-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      
      if (data.success) {
        setCredits(prev => prev - 1); // Deduct credit
        return { success: true, imageUrl: data.image };
      } else {
        return { success: false, message: data.msg || data.message };
      }
    } catch (error) {
      console.error('Image generation error:', error);
      return { success: false, message: 'Image generation failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    credits,
    loading,
    loginUser,
    registerUser,
    logout,
    generateImage,
    getUserCredits,
    backendUrl
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
