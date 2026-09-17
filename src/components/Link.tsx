import classNames from 'classnames';
import useNavigation from '../hooks/use-navigation';
import type { NavigationContextType } from '../context/navigation';
import { twMerge } from 'tailwind-merge';

interface LinkProps {
  to: string,
  children: React.ReactNode,
  className?: string,
  activeClassName?: string,
  rest?: string,
}

function Link({ to, children, className, activeClassName, ...rest }: LinkProps) {
  const { navigate, currentPath }: NavigationContextType = useNavigation();

  const classes:string = twMerge(
    classNames(
      rest.className,
      'text-blue-500',
      className,
      currentPath === to && activeClassName
    ));

  const handleClick = (event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();

    navigate(to);
  };

  return (
    <a {...rest} className={classes} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
