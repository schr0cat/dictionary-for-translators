import { useEffect, useState } from 'react';
import Select from './Select/Select';
import SortableTable from './SortableTable';
import { languagePares } from '../api/languagePares';
import type { Word } from '../api/translateTableConfig';
import { translateTableConfig } from '../api/translateTableConfig';
import { setPare } from '../store';
import { useSelector } from 'react-redux';

function Dictionary() {
  const [words, setWords] = useState<Word[] | null>(null);
  const { currentPare } = useSelector((state) => state.languagePare)

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

  console.log(currentPare);

  useEffect(() => {
    // eslint-disable-next-line
    getWords();
  }, []);

  const keyFn = (word: Word) => {
    return word.id;
  };

  return <div>
    <h2>Выберите языковую пару</h2>

    {/* TODO: сделать так, чтобы при выборе языковой пары, клиент получал разные слова с сервера, которые подходят именно под указанную языковую пару, а не все подряд */}

    <Select options={languagePares} setterFunc={setPare} />

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