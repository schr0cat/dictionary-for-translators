import useAuth from '../hooks/use-auth';
import Dictionary from '../components/Dictionary';

function DictionaryPage() {
  const { status, user } = useAuth();

  return <div>
    {(status === 'ready' && user) ? (
      <>
        <Dictionary></Dictionary>
      </>
    ) : (
      <>
        Содержимое для неавторизованного пользователя
      </> 
    )}
  </div>
};

export default DictionaryPage;