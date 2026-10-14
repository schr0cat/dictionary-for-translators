import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import type { ComponentProps } from 'react'
import { createPortal } from 'react-dom';

// TODO: добавить плавный выезд уведомления из правого края экрана
// TODO: дописать код уведомления таким образом, чтобы оно могло размонтироваться через указанное в пропсах время

interface ToastNotificationProps extends ComponentProps<'div'> {
  children: string,
  success?: boolean,
  error?: boolean,
  warning?: boolean,
}

function ToastNotification({ 
  children,
  success,
  error,
  warning,
  ...rest
}: ToastNotificationProps) {
  const classes: string = twMerge(
    classNames('px-3 py-1.5 rounded-lg text-white w-fit absolute right-[30px] bottom-[30px] select-none text-xl transition-[right]', rest.className, {
      'bg-green-500': success,
      'bg-red-500': error,
      'bg-yellow-500': warning
    })
  );

  const container = document.querySelector('.notification-container');

  if (!container) return null;

  return createPortal(
    <div className={classes}>
      {children}
    </div>,
    container
  )
};

export default ToastNotification;