import Link from './Link';

function Header() {
  return <header className='bg-[#D8E0FF] py-5.5'>
    <div className='container flex justify-between items-center'>
      <Link to='/'>
        <img src='src/img/svg/logo.svg' alt='' />
      </Link>

      <nav className=''>
        <ul className='flex gap-x-6'>
          <Link to='/addWords' primary>Добавить слово/слова</Link>

          <Link to='/dictionary' primary>Словарь</Link>
        </ul>
      </nav>
    </div>
  </header>
};

export default Header;