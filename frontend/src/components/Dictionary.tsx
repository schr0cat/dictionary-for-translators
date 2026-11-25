import { useEffect, useState } from 'react';
import Select from './Select';
import SortableTable from './SortableTable';
import { languagePares } from '../api/languagePares';
import type { Word } from '../api/translateTableConfig';
import { translateTableConfig } from '../api/translateTableConfig';

function Dictionary() {
  const [words, setWords] = useState<Word[] | null>(null);

  const getWords = async () => {
    try {
      const res = await fetch('http://localhost:3010/get-words?recently=false', {
        credentials: 'include'
      });

      const words = await res.json();
      // TODO: преобразовать массив слов из такого вида: {id: '10', user_id: '4', source_text: 'Птица', translation: 'bird', source_language: 'ru', …} в {id: '10', source_text: 'Птица', translation: 'bird'}, то есть оставляем только эти 3 свойства, чтобы соответствовать типу Word[]
      setWords(words);
    } catch (err) {
      console.error(err);
    };
  };

  useEffect(() => {
    // eslint-disable-next-line
    getWords();
  }, []);

  const keyFn = (word: Word) => {
    return word.id;
  };

  return <div>
    <h2>Выберите языковую пару</h2>

    <Select options={languagePares} />

    {
      words &&
      <SortableTable
        data={words}
        config={translateTableConfig}
        keyFn={keyFn}
      />
    }
    
  </div>
};

export default Dictionary;