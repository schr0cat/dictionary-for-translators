import RecentlyAdded from '../components/RecentlyAdded';
import FileDownloadForm from '../components/FileDownloadForm';
import { Link } from 'react-router';
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
              {/* TODO: начать написание вывода недавно добавленных слов для авторизованного пользователя */}
              <RecentlyAdded />
              <FileDownloadForm />
            </div>
          </> 
      }

      {/* TODO: пофиксить баг с тем, что пользователь может нажимая на кнопки перехода к прошлой и следующей страницы перейти на страницы авторизации и регистрации даже при том, что он уже авторизован */}

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