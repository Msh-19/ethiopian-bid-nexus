
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getUserFromStorage, login, logout, saveUserToStorage } from '@/services/authService';

type AuthContextType = {
  user: Omit<User, 'password'> | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = getUserFromStorage();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const userData = login(email, password);
    if (userData) {
      saveUserToStorage(userData);
      const { password: _, ...userWithoutPassword } = userData;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login: handleLogin,
      logout: handleLogout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
