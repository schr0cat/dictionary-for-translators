import useNavigation from '../hooks/use-navigation.ts';

interface RouteProps {
  path: string,
  children: React.ReactNode
};

function Route({ path, children }: RouteProps) {
  const { currentPath } = useNavigation();

  if (path === currentPath) {
    return children;
  }

  return null;
}

export default Route;