import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface LojistaUser {
  name: string;
  email: string;
  restaurantId: number;
  restaurantName: string;
  logo: string;
}

interface LojistaAuthContextType {
  isAuthenticated: boolean;
  user: LojistaUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const LojistaAuthContext = createContext<LojistaAuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => false,
  logout: () => {},
});

export const useLojistaAuth = () => useContext(LojistaAuthContext);

export function LojistaAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LojistaUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('tcf_lojista_token');
    if (token) {
      setIsAuthenticated(true);
      setUser({
        name: 'Carlos Mendes',
        email: 'lojista@burgerhousepg.com',
        restaurantId: 2,
        restaurantName: 'Burger House PG',
        logo: '🍔',
      });
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === 'lojista@burgerhousepg.com' && password === 'loja123') {
      localStorage.setItem('tcf_lojista_token', 'mock-lojista-jwt');
      setIsAuthenticated(true);
      setUser({
        name: 'Carlos Mendes',
        email,
        restaurantId: 2,
        restaurantName: 'Burger House PG',
        logo: '🍔',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('tcf_lojista_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <LojistaAuthContext value={{ isAuthenticated, user, login, logout }}>
      {children}
    </LojistaAuthContext>
  );
}
