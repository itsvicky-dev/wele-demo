import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'guest' | 'active-learner' | 'alumni' | 'admin';

interface UserProfile {
  name: string;
  role: UserRole;
  avatar: string;
}

interface UserContextType {
  user: UserProfile;
  setUserRole: (role: UserRole) => void;
  setUserName: (name: string) => void;
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
  const [user, setUser] = useState<UserProfile>(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    return {
      name: 'Vicky S',
      role: savedRole || 'active-learner',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=varient5'
    };
  });

  const setUserRole = (role: UserRole) => {
    localStorage.setItem('userRole', role);
    setUser(prev => ({ ...prev, role }));
  };

  const setUserName = (name: string) => {
    setUser(prev => ({ ...prev, name }));
  };

  return (
    <UserContext.Provider value={{ user, setUserRole, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};