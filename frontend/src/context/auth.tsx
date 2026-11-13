import { createContext, useEffect, useCallback } from 'react';
import { setUser, setStatus } from '../store'
import { useDispatch, useSelector } from 'react-redux';
import type { AuthSliceType } from '../store/slices/authSlice';

interface AuthContextType extends AuthSliceType {
  refreshUser: () => Promise<void>,
  logoutUser: () => void
};

interface ProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: ProviderProps) {
  const dispatch = useDispatch();
  const { user, status }: AuthSliceType = useSelector(state => state.auth);
  // const [user, setUser] = useState(null);
  // const [status, setStatus] = useState<StatusValues>('loading');

  const refreshUser = async () => {
    try {
      const res = await fetch('http://localhost:3010/me', {
        credentials: 'include'
      });

      const resData: AuthSliceType['user'] = await res.json();
      console.log(resData);
      
      if (res.status === 200) {
        dispatch(setUser(resData));
        dispatch(setStatus('ready'));
      } else if (res.status == 401) {
        dispatch(setUser(null));
        dispatch(setStatus('ready'));
      } else if (res.status === 500) {
        dispatch(setStatus('error'));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const logoutUser = () => {
    dispatch(setUser(null));
    dispatch(setStatus('ready'));
  };

  // TODO: разобраться с useCallback
  // TODO: начать перенос проекта на React Router Dom

  useEffect(() => {
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