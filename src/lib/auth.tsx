import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('tcf_token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ name: 'Administrador', email: 'admin@tocomfome.app.br' });
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === 'admin@tocomfome.app.br' && password === 'admin123') {
      localStorage.setItem('tcf_token', 'mock-jwt-token');
      setIsAuthenticated(true);
      setUser({ name: 'Administrador', email });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('tcf_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext>
  );
}
