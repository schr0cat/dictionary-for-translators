import Link from './Link';
import Button from './Button';
import useAuth from '../hooks/use-auth';
import useNavigation from '../hooks/use-navigation';

function Header() {
  const { status, user, logoutUser } = useAuth();
  const { navigate } = useNavigation();

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:3010/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (res.status === 204) {
        logoutUser();
        navigate('/');
        return;
      };

      console.log(await res.json());
    } catch (err) {
      console.error(err)
    };
  };

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
              <Button outline onClick={logout}>Выйти</Button>
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