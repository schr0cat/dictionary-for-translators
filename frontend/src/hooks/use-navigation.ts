import { useContext } from 'react';
import NavigationContext from '../context/navigation';

function useNavigation() {
  const context = useContext(NavigationContext);

  if (context === null) {
    throw new Error('useNavigation должен использаться внутри NavigationProvider');
  };

  return context;
}

export default useNavigation;