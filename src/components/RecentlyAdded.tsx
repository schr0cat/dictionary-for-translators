import Link from './Link';

function RecentlyAdded() {
  return <div className='bg-(--color-layer-gray) p-6 w-fit rounded-lg'>
    <h2 className='text-xl text-[#464646] mb-6'>Недавно добавленные</h2>

    <ul>
      <li>
        <Link to='/addWords' className='text-(--color-text-blue) underline'>Titanic</Link>
      </li>

      <li>
        <Link to='/addWords' className='text-(--color-text-blue) underline'>Highway</Link>
      </li>

      <li>
        <Link to='/addWords' className='text-(--color-text-blue) underline'>Mountain</Link>
      </li>

      <li>
        <Link to='/addWords' className='text-(--color-text-blue) underline'>Elephant</Link>
      </li>
    </ul>
  </div>
};

export default RecentlyAdded;