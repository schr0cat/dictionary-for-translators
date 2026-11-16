import useAuth from '../hooks/use-auth';

function DictionaryPage() {
  const { status, user } = useAuth();
  
  const getWords = async () => {
    try {
      const res = await fetch('http://localhost:3010/get-words', {
        credentials: 'include'
      });

      const words = await res.json();
      console.log(words);
    } catch (err) {
      console.error(err);
    };
  };
  

  // TODO: написать код для вывода всех слов (и их перевода) пользователя на этой странице

  return <div>
    {(status === 'ready' && user) ? (
      <>
        {
          getWords()
        }
        
        Словарь авторизованного пользователя (в разработке)
      </>
    ) : (
      <>
        Содержимое для неавторизованного пользователя
      </> 
    )}
  </div>
};

export default DictionaryPage;