import { useEffect } from 'react';
import Select from './Select';
import { languages } from '../api/languages';

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

  return <div>
    <h2>Выберите языковую пару</h2>
    
    <Select options={languages}></Select>
  </div>
};

export default Dictionary;