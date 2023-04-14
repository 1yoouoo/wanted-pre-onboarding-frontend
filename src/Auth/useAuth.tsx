import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

type TokenContextType = {
  token: string;
  login: (newToken: string) => void;
  logout: () => void;
};

export const TokenContext = createContext<TokenContextType>({
  token: '',
  login: () => {},
  logout: () => {},
});

export const TokenProvider = ({ children }: any) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken !== token) {
        setToken(storedToken);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [token]);

  const login = useCallback(
    (newToken: string) => {
      localStorage.setItem('token', JSON.stringify(newToken));
      setToken(newToken);
    },
    [setToken]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken('');
  }, [setToken]);

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token, login, logout]
  );

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};
