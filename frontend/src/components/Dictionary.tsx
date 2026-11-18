import { useEffect } from 'react';

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

  </div>
};

export default Dictionary;