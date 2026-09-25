import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import type { ComponentProps } from 'react'

function ToastNotification({ 
  children,
  ...rest
}: ComponentProps<'div'>) {
  const classes: string = twMerge(
    classNames(rest.className)
  );

  return <div className={classes}>
    {children}
  </div>
};

export default ToastNotification;