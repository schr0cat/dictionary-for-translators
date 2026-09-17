import Link from './Link';

function RecentlyAdded() {
  return <div className='bg-[#E8E8E8] p-6 w-fit rounded-lg'>
    <h2 className='text-xl text-[#464646] mb-6'>Недавно добавленные</h2>

    <ul>
      <li>
        <Link to='/addWords' className='text-[#4F40D8] underline'>Titanic</Link>
      </li>

      <li>
        <Link to='/addWords' className='text-[#4F40D8] underline'>Highway</Link>
      </li>

      <li>
        <Link to='/addWords' className='text-[#4F40D8] underline'>Mountain</Link>
      </li>

      <li>
        <Link to='/addWords' className='text-[#4F40D8] underline'>Elephant</Link>
      </li>
    </ul>
  </div>
};

export default RecentlyAdded;