import useAuth from '../hooks/use-auth';
import Dictionary from '../components/Dictionary';

function DictionaryPage() {
  const { status, user } = useAuth();

  // TODO: написать код для вывода всех слов (и их перевода) пользователя на этой странице

  return <div>
    {(status === 'ready' && user) ? (
      <>
        <Dictionary></Dictionary>

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