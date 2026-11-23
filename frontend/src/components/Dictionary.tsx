import { useEffect } from 'react';
import Select from './Select';
import { languagePares } from '../api/languagePares';

function Dictionary() {
  const getWords = async () => {
    try {
      const res = await fetch('http://localhost:3010/get-words?recently=false', {
        credentials: 'include'
      });

      const words = await res.json();
      console.log(words);
    } catch (err) {
      console.error(err);
    };
  };

  useEffect(() => {
    getWords();
  }, []);

  // TODO: начать работу над компонентом сортируемой таблицы слов и переводов

  return <div>
    <h2>Выберите языковую пару</h2>

    <Select options={languagePares}></Select>
  </div>
};

export default Dictionary;