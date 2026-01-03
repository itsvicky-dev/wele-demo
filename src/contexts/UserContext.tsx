import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

export type UserRole = 'guest' | 'active-learner' | 'alumni' | 'admin';

interface UserProfile {
  id?: string;
  name: string;
  role: UserRole;
  avatar: string;
  email?: string;
  phone?: string;
  isAuthenticated: boolean;
}

interface UserContextType {
  user: UserProfile;
  setUserRole: (role: UserRole) => void;
  setUserName: (name: string) => void;
  signIn: (userData: any) => void;
  signOut: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile>(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    const accessToken = localStorage.getItem('accessToken');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const isAuthenticated = !!accessToken;

    return {
      name: name || (email ? email.split('@')[0] : 'Guest User'),
      role: savedRole || 'guest',
      avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${email || 'guest'}`,
      email: email || undefined,
      isAuthenticated
    };
  });

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(prev => ({
            ...prev,
            id: currentUser.id,
            email: currentUser.email,
            phone: currentUser.phone,
            name: currentUser.name || currentUser.email?.split('@')[0] || currentUser.phone || 'User',
            role: 'active-learner',
            isAuthenticated: true,
            avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${currentUser.id}`
          }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const setUserRole = (role: UserRole) => {
    localStorage.setItem('userRole', role);
    setUser(prev => ({ ...prev, role }));
  };

  const setUserName = (name: string) => {
    setUser(prev => ({ ...prev, name }));
  };

  const signIn = (userData: any) => {
    setUser({
      id: userData.id,
      name: userData.name || userData.email?.split('@')[0] || userData.phone || 'User',
      role: 'active-learner',
      avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${userData.id}`,
      email: userData.email,
      phone: userData.phone,
      isAuthenticated: true
    });
    localStorage.setItem('userRole', 'active-learner');
  };

  const signOut = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setUser({
        name: 'Guest User',
        role: 'guest',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=guest',
        isAuthenticated: false
      });
      localStorage.removeItem('userRole');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUserRole, setUserName, signIn, signOut, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};