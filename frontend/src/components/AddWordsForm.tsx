import { useForm } from "react-hook-form";
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form'

interface AddWordsFormInput {
  word: string,
  translate: string,
  [key: string]: string
};


function AddWordsForm() {
  const [wordIdx, setWordIdx] = useState(1); // Хранит в себе индекс текущего слова, если пользователь захочет добавить более 1 нового слова внутри формы
  const [dynamicRenderedInputs, setdynamicRenderedInputs] = useState<React.ReactElement[] | null>(null);
  
  const { register, handleSubmit } = useForm<AddWordsFormInput>();
  const onSubmit: SubmitHandler<AddWordsFormInput> = (formData) => {
    console.log(formData);

    const keys = Object.keys(formData);
    const wordsObj: { [key: string]: string } = {};

    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];

      if (i % 2 === 0) { // превращаем данные из объекта formData в объект вида: 'слово: перевод, слово: перевод, ...'
        wordsObj[formData[currentKey]] = formData[keys[i+1]]
      };
    };

    console.log(wordsObj);

    fetch('http://localhost:3010/add-words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(result => result.json())
      .then(result => console.log(result))
      .catch(err => console.error(err))
  };

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
    <div>
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
    </div>
    
    {dynamicRenderedInputs}
    
    <button type='button' onClick={handleClick}>Добавить +1 слово</button>

    <button type='submit'>Сохранить</button>
  </form>
};

export default AddWordsForm;