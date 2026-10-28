import AddWordsForm from '../components/AddWordsForm';
import useAuth from '../hooks/use-auth';

function AddWordsPage() {
  const { status, user } = useAuth();

  return <div>
    {(status === 'ready' && user) ? (
      <>
        Add words

        <AddWordsForm></AddWordsForm>
      </>
    ) : (
      <>
        Содержимое для неавторизованного пользователя
      </> 
    )}
  </div>
};

export default AddWordsPage;