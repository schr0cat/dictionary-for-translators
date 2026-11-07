import Link from './Link';
import { useEffect, useState } from 'react';

interface RecentlyAddedWord {
  id: number,
  user_id: number,
  source_text: string,
  translation: string,
  source_language: string,
  target_language: string,
  note: string | null,
  created_at: string
};

function RecentlyAdded() {
  const [words, setWords] = useState<RecentlyAddedWord[] | null>(null);
  let renderedItems: React.JSX.Element[] | null = null;

  const getWords = async () => {
    try {
      const res = await fetch('http://localhost:3010/recently-added', {
        credentials: 'include'
      });

      const words = await res.json();
      setWords(words);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    // состояние обновляется после асинхронного запроса /recently-added. Поэтому каскадного рендера не будет 
    // eslint-disable-next-line
    getWords();
  }, []);

  if (Array.isArray(words)) {
    renderedItems = words.map((word) => {
      return <li key={word.id}>
        <Link to='/addWords' className='text-(--color-text-blue) underline'>{word.translation}</Link>
      </li>
    });
  };

  return <div className='bg-(--color-layer-gray) p-6 w-fit rounded-lg'>
    <h2 className='text-xl text-[#464646] mb-6'>Недавно добавленные</h2>

    <ul>{renderedItems}</ul>
  </div>
};

export default RecentlyAdded;