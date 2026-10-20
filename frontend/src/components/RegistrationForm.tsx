import { useForm } from "react-hook-form";
import Input from './Input';
import type { SubmitHandler } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

interface RegistrationFormInput {
  username: string,
  email: string,
  password: string,
  repeatPassword: string
}

const formSchema: yup.ObjectSchema<RegistrationFormInput> = yup.object().shape({ // Используем библиотеку yup для валидации полей ввода и проверки того, что пароли совпадают
  username: yup.string()
    .required('Имя пользователя обязательно!'),

  email: yup.string()
    .email('Введите корректный email')
    .required('Email обязателен'),

  password: yup.string()
    .required('Пароль обязателен!')
    .min(6, 'Длина пароля должна составлять не менее 6 символов')
    .max(20, 'Длина пароля не может превышать 20 символов'),
    
  repeatPassword: yup.string()
    .required('Повтор пароля обязателен!')
    .min(6, 'Длина пароля должна составлять не менее 6 символов')
    .max(20, 'Длина пароля не может превышать 20 символов')
    .oneOf([yup.ref('password')], 'Пароли не совпадают!')
});

function RegistrationForm() {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInput>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<RegistrationFormInput> = async (formData) => {
    const { repeatPassword, ...data } = formData;

    // TODO: решить, что делать с ошибкой TS по поводу неиспользуемой переменной repeatPassword

    console.log(data)

    fetch('http://localhost:3010/new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(result => result.json())
      .then(result => console.log(result))
      .catch(err => console.error(err))
  };

  return <form onSubmit={handleSubmit(onSubmit)} className='block'>
    <fieldset>
      <Input<RegistrationFormInput>
        label='username'
        register={register}
        type='text'
        required={true}
      >
        Придумайте Ваше имя пользователя
      </Input>

      {errors.username && 
        <p role='alert'>{errors.username.message}</p>
      }
    </fieldset>
    
    <fieldset>
      <Input<RegistrationFormInput>
        label='email'
        register={register}
        type='mail'
        required={true}
      >
        Введите адрес Вашей электронной почты
      </Input>

      {errors.email && 
        <p role='alert'>{errors.email.message}</p>
      }
    </fieldset>
    
    <fieldset>
      <Input<RegistrationFormInput>
        label='password'
        register={register}
        type='password'
        autoComplete='new-password'
        required={true}
      >
        Придумайте пароль
      </Input>

      {errors.password && 
        <p role='alert'>{errors.password.message}</p>
      }
    </fieldset>

    <fieldset>
      <Input<RegistrationFormInput>
        label='repeatPassword'
        register={register}
        type='password'
        autoComplete='new-password'
        required={true}
      >
        Повторите пароль
      </Input>

      {errors.repeatPassword && 
        <p role='alert'>{errors.repeatPassword.message}</p>
      }

    </fieldset>

    <button type='submit'>Зарегистрироваться</button>
  </form>
};

export default RegistrationForm;