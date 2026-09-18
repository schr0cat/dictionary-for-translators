import { useForm } from "react-hook-form";
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form'

interface AddWordsFormInput {
  word: string,
  [key: string]: string
};

function AddWordsForm() {
  const [wordIdx, setWordIdx] = useState(1); // Хранит в себе индекс текущего слова, если пользователь захочет добавить более 1 нового слова внутри формы
  const [dynamicRenderedInputs, setdynamicRenderedInputs] = useState<React.ReactElement[] | null>(null);
  
  const { register, handleSubmit } = useForm<AddWordsFormInput>();
  const onSubmit: SubmitHandler<AddWordsFormInput> = (data) => console.log(data);

  const handleClick = () => {
    const inputs: React.ReactElement[] = Array.isArray(dynamicRenderedInputs) ? [...dynamicRenderedInputs] : []; // Если в переменной dynamicRenderedInputs хранится массив, то переменная inputs будет массивом со значениями старого массива. Если dynamicRenderedInputs это null, тогда inputs будет пустым массивом.

    const newInput = <input {...register(`word${wordIdx}`)} key={Math.ceil(Math.random() * 1000)} placeholder='Введите слово' required />; // Создаём новый инпут, регистрируем его имя как: word + индекс текущего слова. Даём случайный ключ в диапазоне от 1 до 1000

    inputs.push(newInput);

    setdynamicRenderedInputs(inputs);
    setWordIdx(wordIdx + 1);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <input 
      {...register('word')}
      placeholder='Введите слово' 
      required 
    />
    
    {dynamicRenderedInputs}
    
    <button type='button' onClick={handleClick}>Добавить +1 слово</button>

    <button type='submit'>Сохранить</button>
  </form>
};

export default AddWordsForm;