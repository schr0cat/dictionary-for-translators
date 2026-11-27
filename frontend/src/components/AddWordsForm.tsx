import { useForm } from "react-hook-form";
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form'
import FormSelect from './Select/FormSelect';
import { languages } from '../api/languages';

interface AddWordsFormInput {
  word: string,
  translate: string,
  [key: string]: string
};

function AddWordsForm() {
  const [wordIdx, setWordIdx] = useState(1); // Хранит в себе индекс текущего слова, если пользователь захочет добавить более 1 нового слова внутри формы
  const [dynamicRenderedInputs, setdynamicRenderedInputs] = useState<React.ReactElement[] | null>(null);

  
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm<AddWordsFormInput>();
  const onSubmit: SubmitHandler<AddWordsFormInput> = (formData) => {
    console.log(formData);

    fetch('http://localhost:3010/add-words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
      .then(result => result.json())
      .then(result => console.log(result))
      .catch(err => console.error(err))
  };

  // TODO: написать код для вывода уведомления пользователю при успешном добавлении слова (слов)

  const handleClick = () => {
    const inputs: React.ReactElement[] = Array.isArray(dynamicRenderedInputs) ? [...dynamicRenderedInputs] : []; // Если в переменной dynamicRenderedInputs хранится массив, то переменная inputs будет массивом со значениями старого массива. Если dynamicRenderedInputs это null, тогда inputs будет пустым массивом.

    const newInputs = <div key={Math.ceil(Math.random() * 1000)}>
        <input {...register(`word${wordIdx}`)} placeholder='Введите слово' required />
        <input {...register(`translate${wordIdx}`)} placeholder='Введите перевод слова' required /> 
        {/* Создаём 2 новых инпута, регистрируем их имя как: word | translate + индекс текущего слова */}
    </div>

    inputs.push(newInputs);

    setdynamicRenderedInputs(inputs);
    setWordIdx(wordIdx + 1);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <fieldset>
      <label>Выберите исходный язык</label>

      <FormSelect
        label='originLang'
        register={register}
        options={languages}
        required
        aria-invalid={errors.originLang ? "true" : "false"}
      />

      {errors.originLang?.type === 'required' && (
        <p role='alert'>Выбор исходного языка обязателен!</p>
      )}

      <label>Выберите язык перевода</label>

      <FormSelect
        label='translateLang'
        register={register}
        options={languages}
        required
        aria-invalid={errors.translateLang ? "true" : "false"}
      />

      {errors.translateLang?.type === 'required' && (
        <p role='alert'>Выбор языка перевода обязателен!</p>
      )}
    </fieldset>

    <fieldset>
      <input 
        {...register('word')}
        placeholder='Введите слово' 
        required 
      />

      <input 
        {...register('translate')}
        placeholder='Введите перевод слова' 
        required 
      />
    </fieldset>
    
    {dynamicRenderedInputs}
    
    <button type='button' onClick={handleClick}>Добавить +1 слово</button>

    <button type='submit'>Сохранить</button>
  </form>
};

export default AddWordsForm;