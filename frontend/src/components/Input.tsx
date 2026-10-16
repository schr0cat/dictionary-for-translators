import type { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

export type InputProps<T extends FieldValues> = {
  children: string
  label: FieldPath<T>
  register: UseFormRegister<T>
  type: string
  required: boolean
}

function Input<T extends FieldValues>({ children, label, register, type, required }: InputProps<T>) {
  return <>
    <label>{children}</label>
    <input {...register(label, {required})} type={type} />
  </>
};

export default Input;