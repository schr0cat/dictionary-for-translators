import classNames from 'classnames';
import useNavigation from '../hooks/use-navigation';
import type { NavigationContextType } from '../context/navigation';
import { twMerge } from 'tailwind-merge';
import type { ComponentProps } from 'react'

interface LinkProps extends ComponentProps<'a'> {
  to: string,
  children: React.ReactNode,
  primary?: boolean,
  secondary?: boolean,
  className?: string,
  activeClassName?: string,
}

function Link({
  to,
  children, 
  primary,
  secondary,
  activeClassName, 
  ...rest
}: LinkProps) {
  const { navigate, currentPath }: NavigationContextType = useNavigation();

  const classes: string = twMerge(
    classNames(
      'text-blue-500 p-[7px_28px]',

      {
        "bg-(--color-primary) text-(--color-white) rounded-lg text-lg": primary,

        "bg-green-500 text-(--color-white)": secondary
      },

      rest.className,

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
