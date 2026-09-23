import { createContext, useState, useEffect } from 'react';

export interface NavigationContextType {
  currentPath: string,
  navigate: (to: string) => void;
};

interface ProviderProps {
  children: React.ReactNode
}

const NavigationContext = createContext<NavigationContextType | null>(null);

function NavigationProvider({ children }: ProviderProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handler);

    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationProvider };
export default NavigationContext;
