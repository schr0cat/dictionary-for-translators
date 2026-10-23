import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface AuthorizationFormInput {
  username: string,
  password: string
};

const formSchema: yup.ObjectSchema<AuthorizationFormInput> = yup.object().shape({
  username: yup.string()
    .required('Введите ваш никнейм'),
  
  password: yup.string()
    .required('Введите ваш пароль')
})

function AuthorizationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthorizationFormInput>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<AuthorizationFormInput> = async (formData) => {
    console.log(formData);

    fetch('http://localhost:3010/authorization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err))
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <fieldset>
      <Input<AuthorizationFormInput>
        label='username'
        register={register}
        type='text'
        required  
      >
        Введите Ваше имя пользователя
      </Input>

      {errors.username &&
        <p role='alert'>{errors.username.message}</p>
      }
    </fieldset>
    
    <fieldset>
      <Input<AuthorizationFormInput>
        label='password'
        register={register}
        type='password'
        autoComplete='current-password'
        required  
      >
        Введите Ваш пароль
      </Input>

      {errors.password &&
        <p role='alert'>{errors.password.message}</p>
      }
    </fieldset>

    <Button success type='submit'>Авторизоваться</Button>
  </form>
};

export default AuthorizationForm;