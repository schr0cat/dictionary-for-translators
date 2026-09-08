import classNames from 'classnames';
import useNavigation from '../hooks/use-navigation';
import type { NavigationContextType } from '../context/navigation';

interface LinkProps {
  to: string,
  children: React.ReactNode,
  className?: string,
  activeClassName?: string
}

function Link({ to, children, className, activeClassName }: LinkProps) {
  const { navigate, currentPath }: NavigationContextType = useNavigation();

  const classes = classNames(
    'text-blue-500',
    className,
    currentPath === to && activeClassName
  );

  const handleClick = (event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();

    navigate(to);
  };

  return (
    <a className={classes} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
