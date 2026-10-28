import RecentlyAdded from '../components/RecentlyAdded';
import FileDownloadForm from '../components/FileDownloadForm';
import Link from '../components/Link';
import useAuth from '../hooks/use-auth';

function IndexPage() {
  const { status, user } = useAuth();

  return (
    <div>
      {
        (status === 'ready' && user) && 
          <>
            <div className='flex gap-x-8 mb-[45px]'>
              <Link to='/addWords' className='bg-(--color-primary) text-lg text-(--color-white) p-[8px_28px] rounded-lg'>Добавить слово/слова</Link>
        
              <Link to='/dictionary' className='bg-(--color-primary) text-lg text-(--color-white) p-[8px_70px] rounded-lg'>Словарь</Link>
            </div>

            <div className='flex gap-x-8'>
              <RecentlyAdded />
              <FileDownloadForm />
            </div>
          </> 
      }

      {
        (status === 'ready' && !user) &&
          <>
            Контент для неавторизованного пользователя
          </>
      }
    </div>
  );
};

export default IndexPage;