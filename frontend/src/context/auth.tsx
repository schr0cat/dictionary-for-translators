import { createContext, useState, useEffect } from 'react';

type StatusValues = "loading" | "ready" | "error";

interface AuthContextType {
  user: { id: number, display_name: string } | null,
  status: StatusValues,
  refreshUser: () => Promise<void>,
  logoutUser: () => void
};

interface ProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState<StatusValues>('loading');

  const refreshUser = async () => {
    try {
      const res = await fetch('http://localhost:3010/me', {
        credentials: 'include'
      });

      const resData = await res.json();
      console.log(resData);
      
      if (res.status === 200) {
        setUser(resData);
        setStatus('ready');
      } else if (res.status == 401) {
        setUser(null);
        setStatus('ready');
      } else if (res.status === 500) {
        setStatus('error');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const logoutUser = () => {
    setUser(null);
    setStatus('ready');
  };

  // TODO: изучить подробнее эту проблему с каскадными ререндерами

  useEffect(() => {
    // состояние обновляется после асинхронного запроса /me. Поэтому каскадного рендера не будет 
    // eslint-disable-next-line
    refreshUser();
  }, []);

  console.log(user);
  console.log(status)

  return (
    <AuthContext.Provider value={{ user, status, refreshUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };