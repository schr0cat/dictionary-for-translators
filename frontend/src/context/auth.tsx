import { createContext, useState, useEffect } from 'react';

type StatusValues = "loading" | "ready" | "error";

interface AuthContextType {
  user: { id: number, display_name: string } | null,
  status: StatusValues,
  refreshUser: () => void
};

interface ProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');

  const refreshUser = async () => {
    try {
      const res = await fetch('http://localhost:3010/me', {
        credentials: 'include'
      });

      const resData = await res.json();
      
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

  // TODO: изучить подробнее эту проблему с каскадными ререндерами

  useEffect(() => {
    refreshUser()
  }, []);

  console.log(user);
  console.log(status)

  // TODO: дописать код создания сессии. Пока что даже при успешной авторизации не обновляются переменные user и status

  return (
    <AuthContext.Provider value={{ user, status, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };