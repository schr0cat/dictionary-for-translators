import useAuth from '../hooks/use-auth';

function DictionaryPage() {
  const { status, user } = useAuth();

  return <div>
    {(status === 'ready' && user) ? (
      <>
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