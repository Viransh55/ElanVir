import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  joinDate: string;
  points: number;
  level: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('elanvir_user');
    const storedToken = localStorage.getItem('elanvir_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'user_123',
      email,
      name: email.split('@')[0],
      joinDate: '2024-01-15',
      points: 250,
      level: 'Silver Curator'
    };

    setUser(mockUser);
    setIsLoggedIn(true);
    localStorage.setItem('elanvir_user', JSON.stringify(mockUser));
    localStorage.setItem('elanvir_token', 'mock_jwt_token');
    
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'user_' + Date.now(),
      email,
      name,
      joinDate: new Date().toISOString().split('T')[0],
      points: 100,
      level: 'Bronze Curator'
    };

    setUser(mockUser);
    setIsLoggedIn(true);
    localStorage.setItem('elanvir_user', JSON.stringify(mockUser));
    localStorage.setItem('elanvir_token', 'mock_jwt_token');
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('elanvir_user');
    localStorage.removeItem('elanvir_token');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('elanvir_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};