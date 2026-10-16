import type { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import type { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type InputProps<T extends FieldValues> = {
  children: string,
  label: FieldPath<T>,
  register: UseFormRegister<T>,
  type: string,
  required: boolean,
} & Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'onChange' | 'onBlur'>



function Input<T extends FieldValues>({ 
  children, 
  label, 
  register, 
  type, 
  required, 
  ...rest 
}: InputProps<T>) {
  const inputClasses: string = twMerge(classNames(rest.className, "" ))

  return <>
    <label>{children}</label>
    <input {...rest} {...register(label, {required})} type={type} className={inputClasses} />
  </>
};

export default Input;