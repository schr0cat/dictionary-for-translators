import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import type { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

export type SelectOption = {
  value: string,
  label: string
};

interface SelectProps<T extends FieldValues> {
  options: SelectOption[],
  register: UseFormRegister<T>,
  label: FieldPath<T>,
  required?: boolean,
};

function Select<T extends FieldValues>({
  options,
  register,
  label,
  required,
  ...rest
 }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  
  const divEl = useRef<HTMLDivElement | null>(null);

  // Если селект открыт и пользователь нажимает в любом месте сайта вне области селекта, этот селект закроется
  useEffect(() => {
    if (!divEl.current) {
      return;
    };

    const handler = (event: MouseEvent) => {
      if (
        divEl.current &&
        event.target instanceof Node &&
        !divEl.current.contains(event.target)
      ) {
        setIsOpen(false);
      };
    };

    document.addEventListener('click', handler, true);

    return () => document.removeEventListener('click', handler, true);
  }, []);

  const renderedOptions = options.map((option) => {
    return <option 
      key={option.value}
      className='p-2 border border-x-2 border-gray-100 w-fit cursor-pointer'
      value={option.value}
    >
      {option.label}
    </option>
  });

  const classes: string = classNames(twMerge(
    'px-2 py-3 border-2 border-gray-100 rounded-md w-fit cursor-pointer'
  ));

  return <div ref={divEl}>
      <select
        {...rest}
        className={classes} 
        onClick={() => setIsOpen(!isOpen)} 
        {...register(label, {required})}
      >
        <option value=''>Выбрать...</option>

        {renderedOptions}
      </select>
  </div>
 
};

export default Select;