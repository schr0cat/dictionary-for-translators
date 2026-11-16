import { NavLink, Link } from 'react-router';
import Button from './Button';
import useAuth from '../hooks/use-auth';

function Header() {
  const { status, user, logoutUser } = useAuth();

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:3010/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (res.status === 204) {
        logoutUser();
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
        <ul className='flex gap-x-6 items-center'>
          {(status === 'ready' && user) ? (
            <>
              <NavLink
                to='/addWords'
                className='bg-(--color-primary) text-lg text-(--color-white) p-[8px_28px] rounded-lg'
              >
                Добавить слово/слова
              </NavLink>

              <NavLink
                to='/dictionary'
                className='bg-(--color-primary) text-lg text-(--color-white) p-[8px_70px] rounded-lg'
              >
                Словарь
              </NavLink>
              
              <Button outline onClick={logout}>Выйти</Button>
            </>
          ) : (
            <>
              <NavLink to='/registration' className='reg-link'>Регистрация</NavLink>
              <NavLink to='/authorization' className='reg-link'>Авторизация</NavLink>
            </>
          )}
        </ul>
      </nav>
    </div>
  </header>
};

export default Header;