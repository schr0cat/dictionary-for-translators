import { useForm } from "react-hook-form";
import Input from './Input';
import type { SubmitHandler } from 'react-hook-form'

interface RegistrationFormInput {
  username: string,
  email: string,
  password: string,
  repeatPassword: string
}

function RegistrationForm() {
  const { register, handleSubmit } = useForm<RegistrationFormInput>();

  const onSubmit: SubmitHandler<RegistrationFormInput> = async (data) => {
    console.log(data);

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
    </fieldset>

    <button type='submit'>Зарегистрироваться</button>
  </form>
};

export default RegistrationForm;