import Link from './Link';
import useAuth from '../hooks/use-auth';

function Header() {
  const { status, user } = useAuth();

  return <header className='bg-[#D8E0FF] py-5.5'>
    <div className='container flex justify-between items-center'>
      <Link to='/'>
        <img src='src/img/svg/logo.svg' alt='' />
      </Link>

      <nav className=''>
        <ul className='flex gap-x-6'>
          {(status === 'ready' && user) ? (
            <>
              <Link to='/addWords' primary>Добавить слово/слова</Link>
              <Link to='/dictionary' primary>Словарь</Link>
            </>
          ) : (
            <>
              <Link to='/registration' secondary>Регистрация</Link>
              <Link to='/authorization' secondary>Авторизация</Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  </header>
};

export default Header;